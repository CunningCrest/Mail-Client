var tempList;
var currentTempIndex;
angular.module("MailApp", ["ui.router"])
  .controller("MainMailController", ["$scope", "todoMessageService", function($scope, todoMessageService) {
    this.list = todoMessageService.initializeFunc();
    this.text = "";
    this.tempIndex;
    this.addItem = function(newAuthor, newTopic, newContent, newList) {
      todoMessageService.addItem(newAuthor, newTopic, newContent, newList);
    }
    this.removeItem = function(newList, deleteIndex) {
      todoMessageService.removeItem(newList, deleteIndex);
    }
    this.getIndex = function(currentIndex) {
      this.tempIndex = todoMessageService.getIndex(currentIndex);
      currentTempIndex = this.tempIndex;
      tempList = this.list.items[this.tempIndex];
    }
    this.getSearchIndex = function(mailList, searchText) {
      this.tempIndex = todoMessageService.getSearchIndex(mailList, searchText);
      tempList = this.list.items[this.tempIndex];
    }
  }])
  .service('todoMessageService', function() {
    this.initializeFunc = function() {
      var model = JSON.parse(localStorage.getItem("keyMail"));
      if (model) {
        return model;
      } else {
        var model = {
          items: [{
              author: "CodeAcademy@gmail.com",
              topic: "Machine learning demystified",
              content: "According to our watches, it’s been 18 hours since the last machine learning news article surfaced on Google News. Do a quick search of the buzzword, and you’ll find a slew of Matrix-inspired green numerals running over a filtered image of a computer or brain.",
              date: new Date(),
              id: 0
            },
            {
              author: "LeraEventSpace@gmail.com",
              topic: "Встреча сообщества MskDotNet ",
              content: "Хотите всю неделю посвятить .NET событиям? Коллеги из MskDotNet проводят MskDotNet Meetup с интересными докладами. Встреча состоится в Москве.",
              date: new Date(),
              id: 1
            },
            {
              author: "Alex745@gmail.com",
              topic: ".NET Meetup #25",
              content: "Времена CRUD приложений прошли безвозвратно. Да, это всё ещё применимые технологии, тем не менее, с каждым днём они устаревают всё больше и больше. Попробуйте современные подходы на воркшопе вместе с Dino Esposito. Вы спроектируете и создадите приложение на event sourcing + CQRS.",
              date: new Date(),
              id: 2
            },
            {
              author: "Oleg100@gmail.com",
              topic: ".NET Meetup #24",
              content: "19:00 Andrei Amialchenia – Создание чат-ботов на платформе Microsoft Bot Framework. 20:00 Anatoly Popov – Использование .NET Core и Linux в реальных системах",
              date: new Date(),
              id: 3
            },
          ]
        };
        localStorage.setItem("keyMail", JSON.stringify(model));
        return model;
      }
    }
    this.addItem = function(newAuthor, newTopic, newContent, newList) {
      if (newContent != "") {
        newList.items.push({
          author: newAuthor,
          topic: newTopic,
          content: newContent,
          date: new Date(),
          id: newList.items.length
        });
        model = newList;
        localStorage.setItem("keyMail", JSON.stringify(model));
      }
    };
    this.removeItem = function(newList, deleteIndex) {
      newList.items.splice(deleteIndex, 1);
      model = newList;
      localStorage.setItem("keyMail", JSON.stringify(model));
    };
    this.getIndex = function(currentIndex) {
      return currentIndex;
    };
    this.getMail = function(tempList) {
      return tempList;
    };
    this.getSearchIndex = function(mailList, searchText) {
      if (searchText != "") {
        for (var i = 0; i < mailList.items.length; i++) {
          if (searchText == mailList.items[i].topic) {
            return i;
          }
        }
      } else {

      }
    };
  })
  .config(function($stateProvider, $urlRouterProvider) {
    var writeState = {
      name: "write",
      url: "/compose",
      template: "<new-letter list='vm.list' add='vm.addItem(newAuthor, newTopic, newContent, newList)'></new-letter>"
    };
    var homeState = {
      name: "home",
      url: "/",
      template: "<mail-list list='vm.list' get-current='vm.getIndex(currentIndex)' remove-item='vm.removeItem(newList, deleteIndex)'></mail-list>",
      resolve: {
        list: function(todoMessageService) {
          return todoMessageService.initializeFunc();
        }
      }
    };
    var fullMail = {
      name: "full",
      url: "/inbox/",
      component: "fullMessage",
      resolve: {
        mail: function(todoMessageService) {
          return todoMessageService.getMail(tempList);
        },

        list: function(todoMessageService) {
          return todoMessageService.initializeFunc();
        }
      }
    };
    $stateProvider.state(writeState);
    $stateProvider.state(homeState);
    $stateProvider.state(fullMail);
    $urlRouterProvider.otherwise('/');
  })
  .component('headMain', {
    bindings: {
      searchText: '<',
      getIndex: '&',
      list: '<'
    },
    controller: function() {},
    template: `
      <div class="header">
        <a class="special" ui-sref="home"><i class="fa fa-envelope fa-5x"></i></a>
        <h1 class="title special">Bsuir.ru</h1>
        <p class="user_name w3-display-topright">Username</p>
        <div class="input_block">
          <input class="header_input special" placeholder="Search" ng-model="$ctrl.searchText""></input>
          <a class="special" ui-sref-active="active" ui-sref="full" ng-click="$ctrl.getIndex({mailList: $ctrl.list, searchText: $ctrl.searchText})"><i class="fa fa-search fa-2x"></i></a>
        </div>
      </div>
    `
  })
  .component('nav', {
    bindings: {},
    template: `
      <div class="topnav">
        <a ui-sref-active="active" ui-sref="home">Messages</a>
        <a ui-sref-active="active" ui-sref="write">Write a message</a>
      </div>
    `
  })
  .component('newLetter', {
    bindings: {
      author: '<',
      topic: '<',
      content: '<',
      add: '&',
      list: '<'
    },
    template: `
      <div class="w3-card-4 letter" >
        <div class="w3-container w3-teal">
          <h2>A new letter</h2>
        </div>
        <form class="w3-container">
          <p>
            <label class="w3-text-teal"><b>Name</b></label>
            <input class="w3-input w3-border w3-sand" ng-model="$ctrl.author" type="text">
          </p>
          <p>
            <label class="w3-text-teal"><b>Topic</b></label>
            <input class="w3-input w3-border w3-sand" ng-model="$ctrl.topic" type="text">
          </p>
          <p>
            <label class="w3-text-teal"><b>Text of the message</b></label>
            <input class="w3-input w3-border w3-sand textMess" ng-model="$ctrl.content" type="text">
          </p>
          <p>
          <a ui-sref-active="active" ui-sref="home">
            <button class="w3-btn w3-teal" ng-click="$ctrl.add({newAuthor:$ctrl.author, newTopic:$ctrl.topic, newContent:$ctrl.content, newList:$ctrl.list})">Send</button></p>
          </a>
        </form>
      </div>
    `
  })
  .component('mailList', {
    bindings: {
      list: '<',
      removeItem: '&',
      getCurrent: '&'
    },
    controller: function() {},
    template: `
      <ul class="w3-ul w3-card-4 message">
        <li class="w3-bar" ng-repeat="mail in $ctrl.list.items track by $index" ng-click="$ctrl.getCurrent({currentIndex:$index})">
          <preview item="mail" list="$ctrl.list" index="$index" delete="$ctrl.removeItem({newList: newList, deleteIndex: deleteIndex})"></preview>
        </li>
      </ul>`
  })
  .component('preview', {
    bindings: {
      list: '<',
      index: '<',
      delete: '&',
      item: '<'
    },
    controller: function() {},
    template: `
      <div >
        <span class="w3-bar-item w3-white w3-button w3-xlarge w3-right" ng-click="$ctrl.delete({newList:$ctrl.list, deleteIndex:$ctrl.index})"><img src="icons/images.jpeg" class="w3-bar-item w3-circle w3-hide-small" style="width:60px"></img></span>
        <img src="icons/img_avatar2.png" class="w3-bar-item  w3-circle w3-hide-small" style="width:85px"></img>
        <div class="w3-bar-item">
          <a ui-sref-active="active" ui-sref="full">
            <span class="w3-xlarge">{{$ctrl.item.author}}</span><br>
            <span class="w3-large">{{$ctrl.item.topic}}</span><br>
            <span class="">{{$ctrl.item.date | date:"medium"}}</span><br>
          </a>
        </div>
      </div>
    `
  })
  .component('fullMessage', {
    bindings: {
      list: '<',
      mail: '<'
    },
    controller: function() {
      this.deleteCurrentMail = function() {
        var removeIndex = this.list.items.indexOf(this.mail);
        this.list.items.splice(removeIndex, 1);
        model = this.list;
        localStorage.setItem("keyMail", JSON.stringify(model));
      };
    },
    template: `
      <div class="w3-card-4 fullLetter" >
        <div class="w3-container">
          <div id="Borge" class="w3-container person">
            <br>
            <a ui-sref-active="active" ui-sref="home">
              <span class="w3-bar-item w3-white w3-button w3-xlarge w3-right" ng-click="$ctrl.deleteCurrentMail()"><img src="icons/images.jpeg" class="w3-bar-item w3-circle w3-hide-small" style="width:60px"></img></span>
            </a>
            <img class="w3-round  w3-animate-top" src="icons/avatar.png" style="width:20%;">
            <h5 class="w3-opacity">Topic: {{$ctrl.mail.topic}}</h5>
            <h4><i class="fa fa-clock-o"></i> From {{$ctrl.mail.author}}, {{$ctrl.mail.date | date:"medium"}}</h4>
            <hr>
            <p>
              {{$ctrl.mail.content}}
            </p>
          </div>
        </div>
      </div>
    `
  });
