export class MainController {
  constructor($timeout, $log, localStorageService, $http, _) {
    'ngInject';
    const vm = this,
      apiHost = 'http://localhost:3000/api',
      defaultImageUrl = './assets/images/',
      defaultImageType = '.jpg',
      imageUrl = 'http://test­be.tsuru.tuzame.com/api/storages/uploads/download/',
      newsApi = new News();

    let storyID = 1;

    // vm => View Model
    vm.progress = false;
    vm.startupProgress = true;
    vm.story = {};
    vm.prevStory = prevStory;
    vm.nextStory = nextStory;
    vm.disabledPrev = true;
    vm.disabledNext = false;

    // post news to StrongLoop API Explorer
    $http.get(apiHost + '/News/count').then(a => {
      (parseInt(a.data.count) > 0) ? newsApi.show() : newsApi.post();
    });

    // prev & next buttons callback functions
    function prevStory() {
      if (storyID - 1 > 0) {
        newsApi.getOne(--storyID);
        vm.disabledNext = false;
      }
      if (storyID === 1) {
        vm.disabledPrev = true;
      }
    }

    function nextStory() {
      if (storyID + 1 < 6) {
        newsApi.getOne(++storyID);
        vm.disabledPrev = false;
      }
      if (storyID === 5) {
        vm.disabledNext = true;
      }
    }

    // Constructor - may be replaced from Controller into Service
    // here and below setTimeout have been set to imitate http answer from the server
    function News() {
      const self = this;
      self.$log = $log;
      self.$http = $http;
      self.getNewsUrl = 'http://test-be.tsuru2.tuzame.com/api/news';
      self.apiHost = 'http://localhost:3000/api';


      self.post = function () {
        return self.$http.get(self.getNewsUrl).then((response) => {
          self.$log.info(response);
          _.chain(response.data)
            .filter((news) => {
              return (news.dynamic.title) ? true : false
            })
            .map((news) => {
              return news.dynamic
            })
            .each((news) => {
              self.$http.post(self.apiHost + '/News', news);
            });
          $timeout(() => {
            vm.startupProgress = false;
            newsApi.getOne(storyID);
          }, 5000);
        })
      };

      self.show = function () {
        $timeout(() => {
          vm.startupProgress = false;
          newsApi.getOne(storyID);
        }, 3000);
        this.$http.get(self.apiHost + '/News').then(news => self.$log.info(news));
      };


      self.getOne = function (id) {
        vm.progress = true;

        $timeout(() => {
          return self.$http.get(self.apiHost + '/News/' + id).then((story) => {

            $http.get(imageUrl + story.data.image).then(() => {
              vm.progress = false;
              vm.story = story.data;
              vm.story.image = imageUrl + vm.story.image;
              return vm.story
            }, () => {
              vm.progress = false;
              vm.story = story.data;
              vm.story.image = defaultImageUrl + id + defaultImageType;
              return vm.story
            });
          })
        }, 1000)
      };


    }
  }
}
