goog.provide('acgraph.vector.svg.Defs');
goog.require('acgraph.vector.Defs');



/**
 * A class for global caching SVG-specific elements. Except gradients, which are cached
 * by the base class, it caches clip rectangles because in SVG they are defined
 * by global references.
 *
 * @param {!acgraph.vector.Stage} stage Renderer.
 * @extends {acgraph.vector.Defs}
 * @constructor
 */
acgraph.vector.svg.Defs = function(stage) {
  goog.base(this, stage);

  /**
   * A hash of created clip rectangles
   * @type {!Object.<string, !Element>}
   * @private
   */
  this.clips_ = {};

  /**
   * Paths.
   * @type {!Object.<string, !Element>}
   * @private
   */
  this.paths_ = {};
};
goog.inherits(acgraph.vector.svg.Defs, acgraph.vector.Defs);


/**
 * The number of digits after the decimal point which are considered significant when clip rectangles are compared.
 * @const
 * @type {number}
 */
acgraph.vector.svg.Defs.CLIP_FRACTION_DIGITS = 4;


/** @inheritDoc */
acgraph.vector.svg.Defs.prototype.clear = function() {
  goog.object.clear(this.clips_);
  goog.object.clear(this.paths_);

  goog.base(this, 'clear');
};


/** @inheritDoc */
acgraph.vector.svg.Defs.prototype.render = function() {
  goog.base(this, 'render');

};


/**
 * Finds in the cache or creates an element describing the clipping defined by a given rectangle.
 * @param {!(acgraph.vector.Shape|goog.math.Rect|acgraph.vector.Clip)} clipShape The rectangle for which it is needed to get a DOM element.
 * @return {!Element} The DOM element describing the clipping.
 */
acgraph.vector.svg.Defs.prototype.getClipPathElement = function(clipShape) {
  /** @type {string} */
  var id = acgraph.utils.IdGenerator.getInstance().identify(clipShape);

  var res = this.clips_[id];
  if (!res)
    this.clips_[id] = res = acgraph.getRenderer().createClipElement();

  return res;
};


/** @inheritDoc */
acgraph.vector.svg.Defs.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  // It appears that there is no sense in destroying the whole structure – it is enough to delete the Defs root in the parent from the DOM.
  for (var i in this.clips_) {
    delete this.clips_[i];
  }
  delete this.clips_;
  for (i in this.paths_) {
    delete this.paths_[i];
  }
  delete this.paths_;
};
