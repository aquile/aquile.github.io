/**
 * Created by aquile_bernadotte on 16.01.16.
 */


$('.picture-header').each(function () {
    var $this = $(this),
        uid = $this.data('uid');

    uploadcare.loadFileGroup(uid)
        .done(function(fileGroup) {
            $.when.apply($, fileGroup.files()).done(function() {
                var images = $.makeArray(arguments);

                $this.removeClass('loading');
                $('.fotorama').fotorama({
                    data: images.map(function(file) {
                        return {img: file.originalUrl+ '-/scale_crop/720x600/center/', thumb: (file.originalUrl + '-/scale_crop/160x100/center/')};
                    })
                });
            });
        })
        .fail(function() {
            // Something went wrong.
        });

});


$('.picture-header').each(function () {
    var $this = $(this),
        uid = $this.data('uid');
    $this.addClass('loading');
})