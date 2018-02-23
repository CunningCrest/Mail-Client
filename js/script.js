angular.module("MailApp", [])
  .controller("MainMailController", ["$scope", "todoMessageService", function($scope, todoMessageService) {
    this.list = todoMessageService.initializeFunc();
    this.text = "";
  }])
  .service('todoMessageService', function() {
    this.initializeFunc = function() {
      var model = JSON.parse(localStorage.getItem("key"));
      if (model) {
        return model;
      } else {
        var model = {
          items: [{
              name: "",
              description: " ",
              time: "",
            },
            {
              name: "",
              description: " ",
              time: "",
            },
            {
              name: "",
              description: " ",
              time: "",
            },
            {
              name: "",
              description: " ",
              time: "",
            }
          ]
        };
        localStorage.setItem("key", JSON.stringify(model));
        return model;
      }
    }
  })
  .component('addMessage', {
    bindings: {},
    controller: {},
    template: `
      <div style="margin-left:60px">
      <form class="w3-container w3-card-4 w3-light-grey w3-text-blue-grey w3-margin">
        <h2 class="w3-center">Write a message</h2>
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
            <div class="w3-rest">
              <input class="w3-input w3-border" name="first" type="text" placeholder="Name">
            </div>
        </div>
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-newspaper-o"></i></div>
            <div class="w3-rest">
              <input class="w3-input w3-border" name="email" type="text" placeholder="Topic">
            </div>
        </div>
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-comment-o"></i></div>
            <div class="w3-rest">
              <input class="w3-input w3-border" name="message" type="text" placeholder="Message">
            </div>
        </div>
        <button class="w3-button w3-block w3-section w3-blue-grey w3-ripple w3-padding">Send</button>
      </form>
    `
  })
  .component('messages', {
    bindings: {
      list: '='
    },
    controller: {},
    template: `
      <ul class="w3-ul w3-card-4">
        <li class="w3-bar" ng-repeat="currentItem in $ctrl.list.items track by $index">
          <span onclick="" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><img src="icons/images.jpeg" class="w3-bar-item w3-circle w3-hide-small" style="width:60px"></img></span>
          <img on-click="" src="icons/img_avatar2.png" class="w3-bar-item w3-button w3-circle w3-hide-small" style="width:85px"></img>
          <div class="w3-bar-item">
            <span class="w3-large">Name</span><br>
            <span>{{currentItem.description}}</span>
          </div>
        </li>
      </ul>
    `
  })
  .component('headerr', {
    bindings: {},
    controller: {},
    template: `
      <div class="w3-container w3-teal" style='height: 150px'>
        <ul class="w3-ul">
          <li class="w3-jumbo w3-teal w3-left"><a href=""><i class="fa fa-envelope"></i></a> Bsuir.ru</li>
        </ul>
        <p class="w3-right-align">Username</p>
        <span></span>
      </div>
      <div>
        <input class="w3-input w3-border w3-display-topmiddle" style='margin-top: 60px;width: 200px; margin-left: 1000'></input>
      </div>
    `
  })
  .component('nav', {
    bindings: {},
    controller: {},
    template: `
      <div class="w3-sidebar w3-bar-block w3-teal w3-xxlarge" style="width:70px">
        <a href="#" class="w3-bar-item w3-button"><i class="fa fa-search"></i></a>
        <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
        <a href="#" class="w3-bar-item w3-button"><i class="fa fa-edit"></i></a>
      </div>
      <div style="margin-left:60px">
    `
  });
