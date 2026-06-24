export const CLOUDINARY_URLS: Record<string, string> = {
  'cinematic_coming_soon_june.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254406/cinematic_coming_soon_june_kkrrg3.mp4',
  'talkinghead_stayling-spacio-002.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254387/talkinghead_stayling-spacio-002_npmjbb.mp4',
  'talkinghead_styaling_spacio_june_07.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254382/talkinghead_styaling_spacio_june_07_diesnm.mp4',
  'talkinghead_tradehub__reel1__1.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254377/talkinghead_tradehub__reel1__1_vzjixq.mp4',
  'talkinghead_TRADEHUB_JUNE__REEL_2___1_.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254374/talkinghead_TRADEHUB_JUNE__REEL_2___1__nxvnxn.mp4',
  'cinematic_ARTHENIC_LUXE__REEL_5_.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254367/cinematic_ARTHENIC_LUXE__REEL_5__vbddgg.mp4',
  'cinematic_swadyog-jun-03.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254361/cinematic_swadyog-jun-03_y2sbfw.mp4',
  'cinematic_unlimited_aamaras_swadyog.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254361/cinematic_unlimited_aamaras_swadyog_uytgdv.mp4',
  'cinematic_ARTHENIC_LUXE__INTRO_.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254349/cinematic_ARTHENIC_LUXE__INTRO__cruhha.mp4',
  'cinematic_ARTHENIC_LUXE__REEL_3.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254348/cinematic_ARTHENIC_LUXE__REEL_3_sf2s8z.mp4',
  'cinematic_swadyog-jun-01.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254344/cinematic_swadyog-jun-01_sfn4g2.mp4',
  'cinematic_swadyog-jun-02.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254330/cinematic_swadyog-jun-02_znhahr.mp4',
  'cinematic_styaling_spacio_june_05.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254324/cinematic_styaling_spacio_june_05_rq3pel.mp4',
  'talkinghead_rs_reel_6990.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254317/talkinghead_rs_reel_6990_dltxcc.mp4',
  'cinematic_ARTHENIC_LUXE__REEL_6_.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254316/cinematic_ARTHENIC_LUXE__REEL_6__agiweo.mp4',
  'talkinghead_TRADEHUB_JUNE__REEL_1___1_.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254305/talkinghead_TRADEHUB_JUNE__REEL_1___1__bndxgy.mp4',
  'cinematic_ARTHENIC_LUXE__REEL_3_.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254288/cinematic_ARTHENIC_LUXE__REEL_3__ycfxmk.mp4',
  'talkinghead_stayling-spacio-01.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254286/talkinghead_stayling-spacio-01_balb2e.mp4',
  'talkinghead_ROHIT_SARAF__6994_.mp4': 'https://res.cloudinary.com/dqee9ldhn/video/upload/f_auto,q_auto/v1782254251/talkinghead_ROHIT_SARAF__6994__rp2yqy.mp4',
};

export const getVideoSrc = (src: string) => {
  if (src.startsWith('/videos/all/')) {
    const filename = src.split('/').pop() || '';
    // Use Cloudinary URL if we have it, otherwise fallback to local
    return CLOUDINARY_URLS[filename] || src;
  }
  return src;
};

export const getPosterSrc = (src: string) => {
  if (src.startsWith('/videos/all/')) {
    const filename = src.split('/').pop() || '';
    const cloudinaryUrl = CLOUDINARY_URLS[filename];
    if (cloudinaryUrl) {
      // Cloudinary trick: swap video extension to .jpg and grab the first frame (so_0)
      return cloudinaryUrl
        .replace('/upload/f_auto,q_auto/', '/upload/f_jpg,q_auto,so_0/')
        .replace(/\.mp4$/, '.jpg');
    }
  }
  return '';
};

export const getLowQualityVideoSrc = (src: string) => {
  if (src.startsWith('/videos/all/')) {
    const filename = src.split('/').pop() || '';
    const cloudinaryUrl = CLOUDINARY_URLS[filename];
    if (cloudinaryUrl) {
      // Aggressively lower quality and resize to 600px width for background/marquee use
      return cloudinaryUrl.replace('/upload/f_auto,q_auto/', '/upload/f_auto,q_auto:eco,w_600/');
    }
  }
  return src;
};
