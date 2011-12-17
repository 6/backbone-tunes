(function($) {

  // the most basic model
  window.Album = Backbone.Model.extend({});

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
