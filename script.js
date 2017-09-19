var tasks = [
{id: 1, name: 'Design UI', description: 'Design Admin UI layout for XYZ Project'},
{id: 2, name: 'Login', description: 'Create Login Validation of XYZ project'},
{id: 3, name: 'Sign Up', description: 'Send user an valiation email after successful signup'}
];

function findTask (taskId) {
  return tasks[findTaskKey(taskId)];
};

function findTaskKey (taskId) {
  for (var key = 0; key < tasks.length; key++) {
    if (tasks[key].id == taskId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#task-list',
  data: function () {
    return {tasks: tasks, searchKey: ''};
  },
  computed: {
    filteredTasks: function () {
      return this.tasks.filter(function (task) {
        return this.searchKey=='' || task.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Task = Vue.extend({
  template: '#task',
  data: function () {
    return {task: findTask(this.$route.params.task_id)};
  }
});

var TaskEdit = Vue.extend({
  template: '#task-edit',
  data: function () {
    return {task: findTask(this.$route.params.task_id)};
  },
  methods: {
    updateTask: function () {
      var task = this.task;
      tasks[findTaskKey(task.id)] = {
        id: task.id,
        name: task.name,
        description: task.description,
        price: task.price
      };
      router.push('/');
    }
  }
});

var TaskDelete = Vue.extend({
  template: '#task-delete',
  data: function () {
    return {task: findTask(this.$route.params.task_id)};
  },
  methods: {
    deleteTask: function () {
      tasks.splice(findTaskKey(this.$route.params.task_id), 1);
      router.push('/');
    }
  }
});

var AddTask = Vue.extend({
  template: '#add-task',
  data: function () {
    return {task: {name: '', description: '', price: ''}}
  },
  methods: {
    createTask: function() {
      var task = this.task;
      tasks.push({
        id: Math.random().toString().split('.')[1],
        name: task.name,
        description: task.description,
        price: task.price
      });
      router.push('/');
    }
  }
});

var router = new VueRouter({routes:[
  { path: '/', component: List},
  { path: '/task/:task_id', component: Task, name: 'task'},
  { path: '/add-task', component: AddTask},
  { path: '/task/:task_id/edit', component: TaskEdit, name: 'task-edit'},
  { path: '/task/:task_id/delete', component: TaskDelete, name: 'task-delete'}
  ]});
app = new Vue({
  router:router
}).$mount('#app')