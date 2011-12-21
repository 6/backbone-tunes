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
  
  /* use with:
  albums = new Albums();
  albums.fetch();
  // see what models fetched:
  albums.models
  // process with:
  albums.map(function(album) { return album.get('title') })
  OR easier: albums.pluck('title');
  */
  window.Albums = Backbone.Collection.extend({
    // collections MUST specify the model that this collection will manage
    model: Album
    ,url: '/albums' // URL from which get albums (see lib/server.rb)
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
  
  window.LibraryAlbumView = AlbumView.extend({});
  
  // display items in the library collection
  window.LibraryView = Backbone.View.extend({
    tagName: 'section' // section tag from HTML5
    ,className: 'library'
    
    ,initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($("#library-template").html());
      // render asynchronously when data arrives
      // trigger render() whenever collection is reset
      this.collection.bind('reset', this.render);
    }
    
    ,render: function() {
      var $albums, // convention: refer to jQuery elements with $ sign in front
          collection = this.collection;
      // this template has no logic/data (for now)
      $(this.el).html(this.template({}));
      // this.$('pattern') --> search within current element
      $albums = this.$('.albums');
      // render a view (LibraryAlbumView) for each model
      collection.each(function(album) {
        var view = new LibraryAlbumView({
          model: album
          ,collection: collection
        });
        // append view to HTML
        $albums.append(view.render().el);
      });
      return this;
    }
  });
  
  // router
  window.BackboneTunes = Backbone.Router.extend({
      routes: {
        // map URL patterns to custom route handlers
        '': 'home'
      }
      
      // instantiates root-level view
      ,initialize: function() {
        this.libraryView = new LibraryView({
          collection: library
        });
      }
      
      ,home: function() {
        var $container  = $("#container");
        $container.empty();
        $container.append(this.libraryView.render().el);
      }
  });
  
  window.library = new Albums();
  
  $(function(){
    // initialize router
    window.App = new BackboneTunes();
    Backbone.history.start(); // uses # by default, but can {pushState:true} 
  });

})(jQuery);
