import TodoModel from '@/Model/TodoModel';

class TodoController {
  private model: any;

  constructor() {
    this.model = TodoModel;
  }

  handleClickAddBtn() {
    this.model.addTodo('todo', 'test');
  }
}

export default new TodoController();
