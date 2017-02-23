const $ = require('jquery');
import { hasPropertyChanged } from '../helpers/helpers.js';
import { switchView } from './workspace.js';
let store = null;
let manifestStore = null;
let lastSelectionState = null;
let lastManifestState = null;

const classNamespace = 'classify-tools';

const DOM = {
  $classifyTools: null,
  $classifyFeedback: null,
  $classifyNumImages: null,
  $classifyMake: null,
  $classifyClear: null,
  $classifyProgress: null,
  $classifyNumSets: null,
  init() {
    DOM.$classifyTools = $(`.${classNamespace}`);
    DOM.$classifyFeedback = $(`.${classNamespace}__feedback`);
    DOM.$classifyNumImages = $(`.${classNamespace}__num-images`);
    DOM.$classifyMake = $(`.${classNamespace}__make`);
    DOM.$classifyClear = $(`.${classNamespace}__clear`);
    DOM.$classifyProgress = $(`.${classNamespace}__progress-bar`);
    DOM.$classifyNumSets = $(`.${classNamespace}__num-sets`);
    DOM.$classifyTitle = $('.classify-tools__title');
    DOM.$savedProgress = $('.saved__progress-bar');
    DOM.$viewer = $('.viewer');
  },
};

const Events = {
  domReady() {
    DOM.init();
    Events.init();
    store.subscribe(Events.storeSubscribe);
    manifestStore.subscribe(Events.manifestStoreSubscribe);
  },
  init() {
    DOM.$classifyNumSets.click(Events.numSetsClick);
    DOM.$classifyTitle.on('click', 'a', Events.titleClick);
  },
  manifestStoreSubscribe() {
    const manifestState = manifestStore.getState();
    console.log(manifestState);
    if (hasPropertyChanged('allImages', manifestState, lastManifestState)) {
      DOM.$classifyNumImages.html(`${manifestState.allImages.length} images`);
    }
    if (hasPropertyChanged('derivedManifestsComplete', manifestState, lastManifestState)) {
      if (typeof manifestState.derivedManifestsComplete.length !== 'undefined') {
        DOM.$classifyNumSets.show();
        DOM.$classifyNumSets.html(`${manifestState.derivedManifestsComplete.length} complete sets`);
      } else {
        DOM.$classifyNumSets.hide();
      }
    }
    if (hasPropertyChanged('manifestData', manifestState, lastManifestState)) {
      DOM.$classifyTitle.html(`<a class="classify-tools__link" href="#">
      ${manifestState.manifestData.metadata[0].value}</a>`);
    }
    if (hasPropertyChanged('classifiedCanvases', manifestState, lastManifestState)) {
      // console.log('classifiedCanvases changed', derivedState, lastLocalState);
      const classifiedTotal = manifestState
      .classifiedCanvases.size;
      const total = manifestState.allImages.length;
      const progressVal = total > 0 ? Math.round((classifiedTotal / total) * 100) : 0;
      DOM.$classifyProgress.val(progressVal);
      DOM.$savedProgress.val(progressVal);
    }
    lastManifestState = manifestState;
  },
  numSetsClick(e) {
    e.preventDefault();
    switchView('done');
  },
  storeSubscribe() {
    const selectionState = store.getState().selectedCollection;
    if (hasPropertyChanged('selectedImages', selectionState, lastSelectionState)) {
      if (selectionState.selectedImages.length) {
        // Show selected context controls
        DOM.$classifyTools
        .removeClass(`${classNamespace}--no-selection`)
        .addClass(`${classNamespace}--selection`);
        DOM.$classifyFeedback.html(`${selectionState.selectedImages.length} selected`);
      } else {
        // Show unselected context controls
        DOM.$classifyTools
        .removeClass(`${classNamespace}--selection`)
        .addClass(`${classNamespace}--no-selection`);
      }
    }
    lastSelectionState = selectionState;
  },
  titleClick(e) {
    e.preventDefault();
    switchView('add');
  },
};

const Init = (globalStore, globalManifestStore) => {
  console.log('classify init');
  store = globalStore;
  manifestStore = globalManifestStore;
};

export default Init;
$(document).ready(Events.domReady);
