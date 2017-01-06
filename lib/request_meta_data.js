const debug = require('debug')('dply:request_meta_data')

const MixinClassUid = require('deployable-mixin-class_uid')
const Timer = require('deployable-timer')
const mix = require('mixwith').mix


class RequestMetaDataMix {}
module.exports = class RequestMetaData extends mix(RequestMetaDataMix).with(MixinClassUid)  {

  constructor ( req, res, options = {} ) {
    super(arguments)
    this.req = req
    this.res = res
    this.logger = ( options.logger ) ? options.logger : console
    this.emd = options.emd
  }

  get emd () {
    return this._emd
  }
  set emd (emd) {
    this._emd = emd
  }

  get req () {
    return this._req
  }
  set req (req) {
    if ( ! req ) throw new Error('No request supplied')
    req._hmd = this
    this._req = req
  }

  get res () {
    return this._res
  }
  set res (res) {
    if ( ! res ) throw new Error('No response supplied')
    res._hmd = this
    this._res = res
  }

  get timer () {
    return this._timer
  }
  // set timer (timer) {
  //   this._timer = timer
  // }

  // from `MixinClassUid`
  get request_id () {
    return this.class_uid
  }
  set request_id (id) {
    this.class_uid = id
  }

  start () {
    this._timer = new Timer()
    return this._timer.start()
    //if (this.emd) this.emd.startRequest(this)
    //return this
  }
  end () {
    //if (this.emd) this.emd.endRequest(this)
    return this._timer.end()
  }
  totalTime () {
    return this._timer.total()
  }
  currentTime () {
    return this._timer.current()
  }
  get logger () {
    return this._logger
  }
  set logger (logger) {
    return this._logger = logger
  }
  logStart () {
    this.logger.info('rmd start',{type:'req', id: this.request_id, url: this.req.url, ip: this.req.ip})
  }
  logEnd () {
    this.logger.info('rmd   end',{type:'res', id: this.request_id, status: this.res.statusCode, time_ms: this.totalTime()})
  }
}
