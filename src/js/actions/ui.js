/* Action Types */
export const HIDE_LIGHTBOX = 'HIDE_LIGHTBOX';
export const SET_CURRENT_IMAGE = 'SET_CURRENT_IMAGE';
export const SET_LOADING_MANIFEST = 'SET_LOADING_MANIFEST';
export const SET_TAB = 'SET_TAB';
export const SET_THUMB_SIZE = 'SET_THUMB_SIZE';
export const SHOW_LIGHTBOX = 'SHOW_LIGHTBOX';
export const TOGGLE_LIST = 'TOGGLE_LIST';

export const hideLightbox = () => ({
  type: HIDE_LIGHTBOX,
});

export const showLightbox = (index) => ({
  type: SHOW_LIGHTBOX,
  index,
});

export const setCurrentImage = (currentImage) => ({
  type: SET_CURRENT_IMAGE,
  currentImage,
});

export const setLoading = (loading) => ({
  type: SET_LOADING_MANIFEST,
  loading,
});

export const setTab = (tab) => ({
  type: SET_TAB,
  tab,
});

export const setThumbSize = (thumbSize) => ({
  type: SET_THUMB_SIZE,
  thumbSize,
});

export const toggleList = () => ({
  type: TOGGLE_LIST,
});
