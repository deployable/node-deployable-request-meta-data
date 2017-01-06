const debug = require('debug')('dply:test:unit:request_meta_data')
const RequestMetaData = require('../lib/request_meta_data')


describe('Unit::RequestMetaData', function () {

  describe('RequestMetaData class', function(){

    let rmd = null

    beforeEach(function(){
      rmd = new RequestMetaData({},{})
    })

    it('should create an instance', function(){
      expect( rmd ).to.be.a.instanceOf( RequestMetaData )
    })

    it('should have a uid', function(){
      expect( rmd.class_uid ).to.match( /^[a-f0-9-]{36}$/ )
    })

    it('should have a prototype of the last mixin', function(){
      let parent = Object.getPrototypeOf(rmd.constructor).name;
      expect( parent ).to.equal( "MixinClassUid" )
    })

    
    it('should start and return a time', function(){
      expect( rmd.start() ).to.be.a.number
    })

    it('should end and return a time', function(){
      rmd.start()
      expect( rmd.end() ).to.be.a.number
    })

    it('should return the total after end', function(){
      a = rmd.start()
      b = rmd.end()
      expect( rmd.totalTime() ).to.be.a.number
      expect( rmd.totalTime() ).to.equal( b - a )
    })

    it('should return a current time value', function(done){
      a = rmd.start()
      setTimeout(()=>{
        expect( rmd.currentTime() ).to.be.a.number
        expect( rmd.currentTime() ).to.be.gt(2)
        expect( rmd.currentTime() ).to.be.lt(50)
        done()
      },3)
    })

  })


})
