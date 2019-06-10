import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { CampaignStatus } from '../../../modules/campaign/model/campaign-status';
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
  id: string;
  parentId?: string;
}
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  id: string;
  parentId?: string;
}

const TREE_DATA = {};
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit, AfterViewInit {
  @Output() AddChildMessage = new EventEmitter<object>();
  parentNode: TodoItemNode;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  newNode: TodoItemFlatNode;
  deleteNode: TodoItemFlatNode;
  selectedNode: string;
  action: string = '';
  treeViewWidth: number;
  displayLoadRootMessage: boolean;
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  hideButton: boolean;
  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }
  // @Input()  childValidation;

  @Input() set childValidation(event) {
    console.log('event-->', event);
    if (event.child === 'add') {
      this.parentNode = this.flatNodeMap.get(this.newNode);
      this.createNew(this.data, this.parentNode);
      this.treeControl.expand(this.newNode);
    } else if (event.child === 'remove') {
      this.parentNode = this.flatNodeMap.get(this.newNode);
      this.removeNode(this.parentNode);
      this.action = '';
    } else if (event.child === 'delete') {
      let deleteParentNode = null;
      let parentFlatNode = null;
      if (this.deleteNode.parentId) {
        parentFlatNode = this.treeControl.dataNodes.find(
          item => item.id === this.deleteNode.parentId
        );
        deleteParentNode = this.flatNodeMap.get(parentFlatNode);
      }
      this.deleteMessageNode(deleteParentNode, this.deleteNode.id);
      this.action = '';
      if (parentFlatNode !== null) {
        this.viewMessage(parentFlatNode);
      } else {
        const eventData = {
          id: null,
          label: 'redirect',
          parentId: null
        };
        this.AddChildMessage.emit(eventData);
      }
    } else if (event.child === 'createCampaign') {
      this.selectedNode = '';
    }
  }

  @Input() set campaignStatus(selectedCampaignStatus) {
    if (
      selectedCampaignStatus &&
      selectedCampaignStatus === CampaignStatus.Completed
    ) {
      this.hideButton = true;
    }
  }
  removeNode(parentNode?: TodoItemNode) {
    if (parentNode && parentNode.children && parentNode.children.length > 0) {
      const item = parentNode.children.find(x => x.id === null);
      if (item) {
        const index = parentNode.children.indexOf(item);
        parentNode.children.splice(index, 1);
        if (parentNode.children.length === 0) {
          parentNode.children = null;
        }
        this.dataChange.next(this.data);
        if (parentNode.children && parentNode.children.length < 1) {
          this.newNode.expandable = false;
        }
      }
    }
  }

  deleteMessageNode(parentNode?: TodoItemNode, toDeleteID?: string) {
    if (parentNode && parentNode.children && parentNode.children.length > 0) {
      const item = parentNode.children.find(x => x.id === toDeleteID);
      if (item) {
        const index = parentNode.children.indexOf(item);
        parentNode.children.splice(index, 1);
        if (parentNode.children.length === 0) {
          parentNode.children = null;
        }
        this.dataChange.next(this.data);
        if (parentNode.children && parentNode.children.length < 1) {
          this.newNode.expandable = false;
        }
      }
    } else {
      this.dataChange.next([]);
    }
  }

  @Input() set campaignMessage(event) {
    if (event.id) {
      console.log('masterData', event);
      if (
        event.savedMessage.messageTitle &&
        this.data.length === 1 &&
        !this.data[0].children
      ) {
        this.updateItem(
          this.data[0],
          event.savedMessage.messageTitle,
          event.id.data
        );
      } else if (event.savedMessage.messageTitle) {
        this.updateItem(
          this.parentNode,
          event.savedMessage.messageTitle,
          event.id.data
        );
      }
    }
  }

  @Input() set loadTreeView(data: any) {
    if (data && data.treeViewDataSource && data.treeViewDataSource.length > 0) {
      console.log('In TreeViewDataSource', data.treeViewDataSource);
      this.displayLoadRootMessage = data.showRootMessage;
      this.dataChange.next(data.treeViewDataSource);
    }
  }

  @Input() set addNewNode(event) {
    if (event && this.action !== 'add') {
      const data = this.buildFileTree(TREE_DATA, 0);
      this.action = 'add';
      this.createNew(data);
      // Notify the change.
      this.dataChange.next(data);
    }
  }

  constructor(private sharedService: SharedService) {
    this.initialize();
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    this.dataChange.subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      if (this.displayLoadRootMessage) {
        this.displayLoadRootMessage = false;
        if (this.treeControl.dataNodes.length > 0) {
          const node = this.treeControl.dataNodes[0];
          this.viewMessage(node);
        }
      }
    });
  }

  ngOnInit() {
    this.sharedService.onViewMessage().subscribe(nodeId => {
      if (nodeId) {
        this.loadViewMessage(nodeId);
      }
    });
  }

  ngAfterViewInit() {
    this.treeViewWidth = document.querySelector(
      '.tree-view-campaign'
    ).clientWidth;
  }

  loadViewMessage(nodeId: string) {
    this.action = '';
    if (nodeId) {
      const node = this.treeControl.dataNodes.find(x => x.id === nodeId);
      if (node) {
        this.viewMessage(node);
      }
    }
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.item === ''

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);
    // this.action = 'add';
    // this.createNew(data);

    // Notify the change.
    this.dataChange.next(data);
  }
  createNew(dataArray: TodoItemNode[], parentNode?: TodoItemNode) {
    const initial: TodoItemNode = {
      item: 'New Message',
      id: null,
      children: null,
      parentId: parentNode ? parentNode.id : null
    };
    if (dataArray.length === 0) {
      dataArray.push(initial as TodoItemNode);
    } else {
      if (parentNode.children) {
        parentNode.children.push(initial as TodoItemNode);
        this.dataChange.next(this.data);
      } else {
        parentNode.children = [];
        parentNode.children.push(initial as TodoItemNode);
        this.dataChange.next(this.data);
      }
    }
  }

  /**
   * Build the file structure tree.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    if (node.children && node.children.length > 0) {
      flatNode.expandable = true;
    } else {
      flatNode.expandable = false;
    }
    flatNode.id = node.id;
    flatNode.parentId = node.parentId ? node.parentId : null;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  updateItem(node: TodoItemNode, MessageName: string, MessageId: string) {
    if (node.children) {
      if (this.selectedNode === node.id) {
        node.item = MessageName;
        node.id = MessageId;
        this.selectedNode = node.id;
      }
      node.children.filter(res => {
        if (res.item === 'New Message' || this.selectedNode === res.id) {
          res.item = MessageName;
          res.id = MessageId;
          this.selectedNode = res.id;
        }
      });
    } else {
      node.item = MessageName;
      node.id = MessageId;
      this.selectedNode = node.id;
    }
    this.dataChange.next(this.data);
    this.action = '';
  }

  addNewMessage(node: TodoItemFlatNode) {
    console.log('node-->', node);

    if (this.action === '') {
      this.action = 'add';
      this.selectedNode = null;
      const eventData = {
        id: node.id,
        label: 'add',
        parentId: node.parentId ? node.parentId : null
      };
      this.AddChildMessage.emit(eventData);
      this.newNode = node;
    } else if (this.action === 'add') {
      this.selectedNode = null;
      const eventData = {
        id: this.newNode.id,
        label: 'add',
        parentId: this.newNode.parentId ? this.newNode.parentId : null
      };
      this.AddChildMessage.emit(eventData);
    }
  }

  deleteMessage(node: TodoItemFlatNode) {
    if (this.action !== 'add') {
      if (node.id) {
        this.deleteNode = node;
        const eventData = {
          id: node.id,
          label: 'delete',
          parentId: node.parentId ? node.parentId : null
        };
        this.AddChildMessage.emit(eventData);
      }
    }
  }

  viewMessage(node: TodoItemFlatNode) {
    if (this.action !== 'add') {
      if (node.id) {
        this.selectedNode = node.id;
        this.parentNode = this.flatNodeMap.get(node);
        const eventData = {
          id: node.id,
          label: 'view',
          parentId: node.parentId ? node.parentId : null
        };
        this.AddChildMessage.emit(eventData);
      }
    }
  }
}
