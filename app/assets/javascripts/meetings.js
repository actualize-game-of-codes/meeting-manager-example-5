/* global Vue, $ */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      meetings: [],
      nameFilter: "",
      sortAttribute: "name",
      sortAscending: false,
      newMeetingName: "",
      newMeetingAddress: "",
      newMeetingStartTime: "",
      newMeetingEndTime: "",
      newMeetingNotes: ""
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
      },
      changeSortAttribute: function(inputSortAttribute) {
        this.sortAttribute = inputSortAttribute;
      },
      createMeeting: function() {
        $.ajax({
          url: "/api/v1/meetings",
          type: "POST",
          data: `name=${this.newMeetingName}&address=${this.newMeetingAddress}`,
          success: function(response) {
            this.meetings.push(response);
          }.bind(this)
        });
      }
    },
    computed: {
      modifiedMeetings: function() {
        return this.meetings.sort(function(a, b) {
          if (this.sortAscending) {
            return a[this.sortAttribute] > b[this.sortAttribute];
          } else {
            return a[this.sortAttribute] < b[this.sortAttribute];
          }
        }.bind(this));
      }
    }
  });
});
