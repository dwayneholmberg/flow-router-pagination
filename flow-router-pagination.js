import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


var paginationBar;

Template.paginationBar.helpers({
  pages: function(count) {
    var current, total;
    current = parseInt(FlowRouter.getQueryParam('page')) || 0;
    total = Math.ceil(Counts.get(count) / this.itemsPerPage);
    return paginationBar(this.window, total, current);
  },
  pageNumber: function() {
    return this + 1;
  },
  isActive: function() {
    var current;
    current = parseInt(FlowRouter.getQueryParam('page')) || 0;
    if (parseInt(this) === current) {
      return true;
    } else {
      return false;
    }
  },
  showPager: function (count) {
    var pages = Math.ceil(Counts.get(count) / this.itemsPerPage);
    return pages > 1;
  },
  showMinus: function() {
    var current;
    current = parseInt(FlowRouter.getQueryParam('page')) || 0;
    return current !== 0;
  },
  showPlus: function(count) {
    var all, current, total;
    current = parseInt(FlowRouter.getQueryParam('page')) || 0;
    total = Math.ceil(Counts.get(count) / this.itemsPerPage);
    all = paginationBar(this.window, total, current);
    return current !== all.slice(-1)[0];
  }
});

Template.paginationBar.events({
  'click .first': function(e, t) {
    e.preventDefault();
    return FlowRouter.setQueryParams({
      page: 0
    });
  },
  'click .last': function(e, t) {
    var total;
    total = Math.ceil(Counts.get(this.count) / this.itemsPerPage);
    e.preventDefault();
    return FlowRouter.setQueryParams({
      page: total - 1
    });
  },
  'click .plus': function(e, t) {
    var current;
    current = parseInt(FlowRouter.getQueryParam('page')) || 0;
    e.preventDefault();
    return FlowRouter.setQueryParams({
      page: current + 1
    });
  },
  'click .minus': function(e, t) {
    var current;
    current = parseInt(FlowRouter.getQueryParam('page')) || 0;
    e.preventDefault();
    return FlowRouter.setQueryParams({
      page: current - 1
    });
  },
  'click .change-page': function(e, t) {
    var page;
    page = $(e.target).attr('page');
    page = parseInt(page);
    e.preventDefault();
    return FlowRouter.setQueryParams({
      page: page
    });
  }
});

paginationBar = function(pwindow, total, current) {
  var end, i, ini, middle, results;
  middle = Math.ceil(pwindow / 2);
  ini = current - middle;
  end = current + middle;
  if (ini < 0) {
    ini = 0;
    if (total > pwindow) {
      end = pwindow;
    } else {
      end = total;
    }
  } else if (end >= total) {
    end = total;
    ini = end - pwindow;
    if (ini < 0) {
      ini = 0;
    }
  }
  return (function() {
    results = [];
    for (var i = ini; ini <= end ? i < end : i > end; ini <= end ? i++ : i--){ results.push(i); }

    return results;
  }).apply(this);
};
