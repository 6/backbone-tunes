var albumData = [{
    "title":  "Album A",
    "artist": "Artist A",
    "tracks": [
        {
            "title": "Track A",
            "url": "/music/Album A Track A.mp3"
        },
        {
            "title": "Track B",
            "url": "/music/Album A Track B.mp3"
        }]
}, {
    "title": "Album B",
    "artist": "Artist B",
    "tracks": [
        {
            "title": "Track A",
            "url": "/music/Album B Track A.mp3"
        },
        {
            "title": "Track B",
            "url": "/music/Album B Track B.mp3"
    }]
}];

describe("Album", function () {

    beforeEach(function () {
        this.album = new Album(albumData[0]);
    });

    it("creates from data", function () {
        expect(this.album.get('tracks').length).toEqual(2);
    });
    
    // test the model some more
    describe("first track", function() {
      it("indentifies correct first track", function() {
        expect(this.album.isFirstTrack(0)).toBeTruthy();
      });
    });
    
    describe("last track", function() {
      it("indentifies correct last track", function() {
        expect(this.album.isLastTrack(1)).toBeTruthy();
      });
    });

    it("returns url for track", function() {
      expect(this.album.trackUrlAtIndex(0)).toEqual('/music/Album A Track A.mp3');
    });

});
