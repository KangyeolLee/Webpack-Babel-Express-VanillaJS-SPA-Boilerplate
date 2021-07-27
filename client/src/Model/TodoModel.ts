import Observable from '@/Core/Observable';

class TodoModel extends Observable {
  private todos: any;

  constructor() {
    super();
    this.todos = ['initial'];
  }

  addTodo(key: string, todo: any) {
    const nextTodos = { todos: [...this.todos, todo] };
    this.todos = [...this.todos, todo];
    this.notify(key, nextTodos);
  }
}

export default new TodoModel();
