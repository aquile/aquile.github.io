Ext.applyIf(String.prototype, {
    contrastColor : function() { 
        if(this.substr(0, 1)  !== '#' && this.substr(0, 3)  !== 'rgb' ) {
            return false;
        }
        var color = this.substr(0, 1)  === '#' ? this.replace(/#(..)(..)(..)/, '0x$1,0x$2,0x$3') : this.substr(4,this.length-5),           
            rgb = color.split(','), 
            r = parseInt(rgb[0]), 
            g = parseInt(rgb[1]), 
            b = parseInt(rgb[2]), 
            brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return (brightness > 100 ? '#000000' : '#FFFFFF');
    }
});