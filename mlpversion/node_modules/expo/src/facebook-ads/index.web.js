// @flow

module.exports = {
  get withNativeAd() {
    return () => console.log('withNativeAd not supported on web');
  },
  get AdSettings() {
    return () => console.log('AdSettings not supported on web');
  },
  get NativeAdsManager() {
    return () => console.log(' NativeAdsManager not supported on web');
  },
  get InterstitialAdManager() {
    return () => console.log('InterstitialAdManager not supported on web');
  },
  get BannerView() {
    return () => console.log('BannerView not supported on web');
  },
};
