import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import {
  TreeViewComponent,
  TodoItemNode,
  TodoItemFlatNode
} from './tree-view.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TreeViewComponent', () => {
  let component: TreeViewComponent;
  let fixture: ComponentFixture<TreeViewComponent>;
  const parentNode = {
    item: 'New Message',
    id: null,
    children: null
  };
  const finalArray = [
    {
      item: 'New Message',
      id: null,
      children: []
    }
  ];
  const node = {
    id: '22334',
    item: 'sample',
    level: 0,
    expandable: true,
  };
  const initial = {
    item: 'New Message',
    id: null,
    children: null
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeViewComponent],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the tree view data', () => {
    const messageArray = [
      {
        item: 'New Message',
        id: null,
        children: []
      }
    ];
    spyOn(component, 'data').and.returnValue(messageArray);
    expect(component.data.length).toEqual(1);
  });

  it('should create new message to  treeView', () => {
    const array: TodoItemNode[] = [];
    spyOn(component, 'buildFileTree').and.returnValue([]);
    const createSpy = spyOn(component, 'createNew').and.callFake(() => {
      expect(createSpy).toHaveBeenCalledWith(array);
    });
    if (array.length === 0) {
      array.push(initial as TodoItemNode);
    }
    expect(array.length).toEqual(1);
  });

  it('should update message item', async () => {
    const parentMsg = {
      children: [ {
        item: 'New Message',
        id: null,
        children: null
      }
      ],
      item: 'sample',
      id: '22334'
    }
    component.campaignMessage = 'test';
    const updateSpy = spyOn(component, 'updateItem').and.callThrough();
    component.updateItem(parentMsg, 'test', '9876');
    expect(updateSpy).toHaveBeenCalledWith(parentMsg, 'test', '9876');
    component.updateItem(parentNode, 'test123', '6789');
    if (parentMsg.children) {
      parentMsg.children.filter(res => {
        if (res.item === 'New Message') {
          res.item = 'test';
          res.id = '9876';
        }
      });
    } else {
      parentMsg.id = '9876';
      parentMsg.item = 'test';
    }
   expect(component.selectedNode).toEqual('6789');
    finalArray.push(parentMsg);
  });

  it('should check childValidation and call the method accordingly', async () => {
    const parentItem = {
      item: 'sample',
      id: '22334',
      children: []
    };
    const event = { child: 'add' };
    component.childValidation = event.child;
    if (component.childValidation === 'add') {
      const createSpy = spyOn(component, 'createNew').and.callThrough();
      component.createNew(finalArray, parentItem);
      expect(createSpy).toHaveBeenCalledWith(finalArray, parentItem);
    } else {
      const removeSpy = spyOn(component, 'removeNode').and.callThrough();
      component.removeNode(parentItem);
      expect(removeSpy).toHaveBeenCalledWith(parentItem);
    }
    console.log('final', finalArray);
  });

  // it('should call addNewMessage method', async() => {
  //   const eventData = {
  //     id: node.id,
  //     label: 'add',
  //     parentId: '22334'
  //   };
  //   const eventSpy = spyOn(component.AddChildMessage, 'emit');
  //   const addMessageSpy = spyOn(component, 'addNewMessage').and.callThrough();
  //   component.addNewMessage(node);
  //     // expect(addMessageSpy).toHaveBeenCalledWith(node);
  //   expect(component.action).toEqual('add');
  //   fixture.detectChanges();
  //   component.AddChildMessage.emit(eventData);
  //   expect(eventSpy).toHaveBeenCalledWith(eventData);
  // });

  it('should add the initial when parent child is null', async () => {
    const parentItem = {
      item: 'hello',
      id: '1234',
      children: null
    };
    const createSpy = spyOn(component, 'createNew').and.callThrough();
    component.createNew(finalArray, parentItem);
    expect(createSpy).toHaveBeenCalledWith(finalArray, parentItem);
    if (parentItem.children) {
      parentItem.children.push(initial as TodoItemNode);
    } else {
      parentItem.children = [];
      parentItem.children.push(initial as TodoItemNode);
    }
  });

  it('should add the initial when parent child is []', async () => {
    const parentMsg = {
      item: 'hello',
      id: '1234',
      children: []
    };
    const createNewSpy = spyOn(component, 'createNew').and.callThrough();
    component.createNew(finalArray, parentMsg);
    expect(createNewSpy).toHaveBeenCalledWith(finalArray, parentMsg);
    if (parentMsg.children) {
      parentMsg.children.push(initial as TodoItemNode);
    }
  });

  it('should call deleteMessage method', async() => {
    const eventData = {
      id: node.id,
      label: 'delete',
    };
    const eventSpy = spyOn(component.AddChildMessage, 'emit');
    const deleteSpy = spyOn(component, 'deleteMessage').and.callThrough();
    component.deleteMessage(node);
    expect(deleteSpy).toHaveBeenCalledWith(node);
    fixture.detectChanges();
    component.AddChildMessage.emit(eventData);
    expect(eventSpy).toHaveBeenCalledWith(eventData);
  });

  it('should call viewMessage method', async() => {
    const eventData = {
      id: node.id,
      label: 'view',
    };
    component.action = '';
    const eventSpy = spyOn(component.AddChildMessage, 'emit');
    const viewSpy = spyOn(component, 'viewMessage').and.callThrough();
    component.viewMessage(node);
      expect(viewSpy).toHaveBeenCalledWith(node);
    expect(component.action).not.toEqual('add');
    fixture.detectChanges();
    component.AddChildMessage.emit(eventData);
    expect(eventSpy).toHaveBeenCalledWith(eventData);
  });
});
