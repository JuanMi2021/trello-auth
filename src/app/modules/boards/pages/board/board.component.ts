import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { ToDo, Column } from '@models/todo.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent {
  columns: Column[] = [
    {
      title: 'Hacer',
      todos: [
        {
          id: '1',
          title: 'JuanMi'
        },
        {
          id: '6',
          title: 'Judith'
        },
        {
          id: '7',
          title: 'Fernando'
        },
        {
          id: '8',
          title: 'Antonio'
        }
      ]
    },
    {
      title: '25%',
      todos: [
        {
          id: '3',
          title: 'Robert'
        },
        {
          id: '9',
          title: 'Jose'
        },
        {
          id: '10',
          title: 'Sebas'
        }
      ]
    },
    {
      title: '50%',
      todos: [
        {
          id: '4',
          title: 'Santi'
        },        {
          id: '11',
          title: 'JuanMa'
        }
      ]
    },
    {
      title: 'Finalizado',
      todos: [
        {
          id: '5',
          title: 'Javi'
        },        {
          id: '12',
          title: 'Paula'
        },        {
          id: '13',
          title: 'Bartu'
        },        {
          id: '2',
          title: 'Cristina'
        }
      ]
    }
  ];

  todos: ToDo[] = [];
  doing: ToDo[] = [];
  done: ToDo[] = [];

  constructor(private dialog: Dialog) {}

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addColumn() {
    this.columns.push({
      title: 'Nueva Columna',
      todos: [],
    });
  }

  openDialog(todo: ToDo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todo: todo,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }
}
