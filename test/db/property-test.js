var Class = require('../../lib/db/class');

describe("Database API - Class - Property", function () {
  before(function (done) {
    CREATE_TEST_DB(this, 'testdb_dbapi_property')
    .bind(this)
    .then(function () {
      return this.db.class.get('OUser');
    })
    .then(function (item) {
      this.class = item;
    })
    .then(done, done)
    .done();
  });
  after(function (done) {
    DELETE_TEST_DB('testdb_dbapi_property')
    .then(done, done)
    .done();
  });

  describe('Db::class.property.list()', function () {
    it('should list the properties in the class', function (done) {
      this.class.property.list()
      .bind(this)
      .then(function (properties) {
        properties.length.should.be.above(0);
        done();
      }, done).done();
    });
  });

  describe('Db::class.property.create()', function () {
    it('should create a property with the given name', function (done) {
      this.class.property.create('myprop')
      .then(function (item) {
        item.name.should.equal('myprop');
        done();
      }, done).done();
    });
  });


  describe('Db::class.property.get()', function () {
    it('should get the property with the given name', function (done) {
      this.class.property.get('roles')
      .then(function (item) {
        item.name.should.equal('roles');
        done();
      }, done).done();
    });
    it('should get the newly created property with the given name', function (done) {
      this.class.property.get('myprop')
      .then(function (item) {
        item.name.should.equal('myprop');
        done();
      }, done).done();
    });
  });



  describe('Db::class.property.alter()', function () {
    it('should alter a property with the given name', function (done) {
      this.class.property.alter('myprop', 'NAME myprop2')
      .then(function (item) {
        return item.property.get('myprop2')
      })
      .then(function (item) {
        item.name.should.equal('myprop2');
        done();
      }, done).done();
    });
  });

  describe('Db::class.property.update()', function () {
    it('should update a property with the given name', function (done) {
      this.class.property.update({
        name: 'myprop2',
        max: 20
      })
      .then(function (item) {
        item.name.should.equal('myprop2');
        item.max.should.eql(20);
        done();
      }, done).done();
    });
  });


  describe('Db::class.property.delete()', function () {
    it('should delete a property with the given name', function (done) {
      this.class.property.delete('myprop2')
      .then(function (item) {
        done();
      }, done).done();
    });
  });


});