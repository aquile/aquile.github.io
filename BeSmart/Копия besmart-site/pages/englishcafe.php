<?php
    Widget::renderWidget('TopMenu', array(
        'info' => $this->info,
        'menu' => array(
            array(
                'href' => '/schedule',
                'text' => 'РАСПИСАНИЕ'
            ),
            array(
                'href' => '/abonementy',
                'text' => 'ЦЕНЫ'
            ),
            array(
                'href' => '/testy',
                'text' => 'ТЕСТЫ'
            ),
            array(
                'href' => '/franchising',
                'text' => 'ФРАНЧАЙЗИНГ'
            ),
            array(
                'href' => '/otzyvy',
                'text' => 'ОТЗЫВЫ'
            ),
            array(
                'href' => '/kontakty',
                'text' => 'КОНТАКТЫ'
            )
        )
    ));
?>
<div id='pageholder'>
    <?php Widget::renderWidget('Afisha'); ?>
    <div class="page gallery">
        <div class="page_field" style="padding-top: 65px;">
            <div style="text-align: center;"><h2>ФОТОГРАФИИ</h2></div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss1.jpg" original="/gallery_pictures/simple/original/sb1.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss2.jpg" original="/gallery_pictures/simple/original/sb2.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss3.jpg" original="/gallery_pictures/simple/original/sb3.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss4.jpg" original="/gallery_pictures/simple/original/sb4.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss5.jpg" original="/gallery_pictures/simple/original/sb5.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss6.jpg" original="/gallery_pictures/simple/original/sb6.jpg"/>
            </div>
            <div class="clr"></div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss7.jpg" original="/gallery_pictures/simple/original/sb7.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss8.jpg" original="/gallery_pictures/simple/original/sb8.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss9.jpg" original="/gallery_pictures/simple/original/sb9.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss10.jpg" original="/gallery_pictures/simple/original/sb10.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss11.jpg" original="/gallery_pictures/simple/original/sb11.jpg"/>
            </div>
            <div class="image_float">
                <img src="/gallery_pictures/simple/thumbs/ss12.jpg" original="/gallery_pictures/simple/original/sb12.jpg"/>
            </div>
            <div class="clr"></div>
        </div>
    </div>
    
    <div class="page gallery_video">
        <div class="page_field" style="padding-top: 65px;">
            <div style="text-align: center;"><h2 class="blueline" style="padding-top:20px;">ВИДЕО</h2></div>
            <div style="padding-top: 20px;">
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/1video.jpg')">
                        <div class="play_video_icon" original="DGjAgTSuT7o"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/2video.jpg')">
                        <div class="play_video_icon" original="37a3BVzBgh4"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/3video.jpg')">
                        <div class="play_video_icon" original="3dc-BXMy97E"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/4video.jpg')">
                        <div class="play_video_icon" original="I-7zThP4vMQ"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/5video.jpg')">
                        <div class="play_video_icon" original="EVjiM1RWiC8"></div>
                    </div>
                </div>
                <div class="video_item">
                    <div class="play_video" style="background-image: url('/templates/general/images/video/6video.jpg')">
                        <div class="play_video_icon" original="vKvopobo1pw"></div>
                    </div>
                </div>
                <div class="clr"></div>
            </div>
        </div>
    </div>
    <div class="page" style="background-image: url('/templates/landingtpl/images/Kontakty_New4.png');"></div>
<!--    <div class="page contacts" id="contacts">
        <div style="padding-top: 128px;">
            <div style="background-color: #5cc0db; height: 500px;">
                <div class="page_field" style="padding: 0;">
                    <div style="float: left; width: 500px; padding-top: 25px; text-align: center">
                        <h2>ВСЕГДА РАДЫ</h2>
                        <div class="contact_list">
                            <div class="item1" style="line-height: 96px;">(044) 362 62 49</div>
                            <div class="item2">Киев, Тимошенко 18</div>
                            <div class="item3">admin@besmart.in.ua</div>
                        </div>
                    </div>
                    <div style="float: left; width: 500px; padding-top: 25px;">
                        <img src="/templates/general/images/map.jpg">
                    </div>
                    <div class="clr"></div>
                </div>
            </div>
        </div>
    </div>-->
<?php Widget::renderWidget('Footer'); ?>
</div>
<!--<script src="/templates/general/js/landing.js"></script>!-->
        