/* global Vue, $ */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      meetings: [],
      nameFilter: ""
    },
    mounted: function() {
      $.ajax({
        url: "/api/v1/meetings",
        type: "GET",
        success: function(response) {
          console.log(response);
          this.meetings = response;
        }.bind(this)
      });
    },
    methods: {
      isValidMeeting: function(inputMeeting) {
        return inputMeeting.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
      }
    },
    computed: {

    }
  });
});
