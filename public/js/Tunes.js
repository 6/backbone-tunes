(function($) {

  // the most basic model
  window.Album = Backbone.Model.extend({
    isFirstTrack: function(index) {
      return index == 0;
    }
    
    ,isLastTrack: function(index) {
      return index >= this.get('tracks').length - 1;
    }
    
    ,trackUrlAtIndex: function(index) {
      if(this.get('tracks').length >= index) {
        return this.get('tracks')[index].url;
      }
      return null;
    }
  });

  window.AlbumView = Backbone.View.extend({
    tagName: 'li'
    ,className: 'album'
    
    ,initialize: function() {
      // bind to this, render is the view cb
      _.bindAll(this, 'render');
      // notified when model changes
      this.model.bind('change', this.render); // re-render entire view
      // template to associate with this view
      this.template = _.template($('#album-template').html());
    }
    
    ,render: function() {
      var renderedContent = this.template(this.model.toJSON());
      $(this.el).html(renderedContent); // el is wrapper element of this view
      return this; // return this so we can chain other calls
    }
  });

})(jQuery);
