<?php

# @autor Viktor Protsenko <pro.victorr@gmail.com>
define(ROOT_DIR, $_SERVER['DOCUMENT_ROOT']);
define(SITE_URL, $_SERVER['HTTP_HOST']);

define(WIDGETS_DIR, ROOT_DIR . '/widgets/');
define(GALLERY_PATH, 'gallery_pictures');
define(VIDEO_FOLDER, 'video');
define(PHOTO_FOLDER, 'image');

define(APPVERSION, '1.1.21');

$MIME_IMAGE_TYPES = array(
    IMAGETYPE_GIF => 'image/gif',                           ###  1 = GIF
    IMAGETYPE_JPEG => 'image/jpeg',                         ###  2 = JPG
    IMAGETYPE_PNG => 'image/png',                           ###  3 = PNG
    IMAGETYPE_SWF => 'application/x-shockwave-flash',       ###  4 = SWF  // A. Duplicated MIME type
    IMAGETYPE_PSD => 'image/psd',                           ###  5 = PSD
    IMAGETYPE_BMP => 'image/bmp',                           ###  6 = BMP
    IMAGETYPE_TIFF_II => 'image/tiff',                      ###  7 = TIFF (intel byte order)
    IMAGETYPE_TIFF_MM => 'image/tiff',                      ###  8 = TIFF (motorola byte order)
    IMAGETYPE_JPC => 'application/octet-stream',            ###  9 = JPC  // B. Duplicated MIME type
    IMAGETYPE_JP2 => 'image/jp2',                           ### 10 = JP2
    IMAGETYPE_JPX => 'application/octet-stream',            ### 11 = JPX  // B. Duplicated MIME type
    IMAGETYPE_JB2 => 'application/octet-stream',            ### 12 = JB2  // B. Duplicated MIME type            
    IMAGETYPE_SWC => 'application/x-shockwave-flash',       ### 13 = SWC  // A. Duplicated MIME type
    IMAGETYPE_IFF => 'image/iff',                           ### 14 = IFF
    IMAGETYPE_WBMP => 'image/vnd.wap.wbmp',                 ### 15 = WBMP
    IMAGETYPE_XBM => 'image/xbm'                            ### 16 = XBM
);
?>