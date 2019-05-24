var progress = 0;
var width = 143;

var BTN = ' .progress_btn';
var BG = ' .progress_bg';
var BAR = ' .progress_bar';

window.Percent = _progress;

function _progress ( $wrap, id, fn ) {

    $.extend( this, {
        min: 0,
        max: 6,
        id: id,
        btn: id + BTN,
        bg: id + BG,
        bar: id + BAR,
        setCss: function () {
            $( this.btn ).css( 'left', this.get() );
            $( this.bar ).css( { width: this.get() } );
        },
        set: function ( value ) {
            if ( value !== progress ) {
                progress = value;
                this.setCss();

                if ( typeof fn === 'function' ) {
                    fn.call( this, progress / width );
                }

            } else if ( value == null || typeof progress !== 'number' ) {
                throw new Error( 'progress 值必须是 number 类型' );
            }
            return progress;
        },
        get: function () {
            return progress;
        },
        getW: function () {
            return width;
        },
        setW: function ( value ) {
            width = value;
            return width;
        },
        reset: function () {
            this.set( 0 );
            this.setCss();
            return progress;
        },
        init: function () {

            var tag = false, ox = 0, bgleft = 0;
            var p = this;
            var w = p.getW();

            $wrap.on( 'mousedown', p.btn, function ( $e ) {
                ox = $e.pageX - p.get();
                tag = true;
            } );

            // 鼠标移动
            $wrap.on( 'mousemove', p.id, function ( $e ) {

                if ( !tag ) {
                    return true;
                }

                p.set( $e.pageX - ox );

                if ( p.get() <= 0 ) {
                    p.set( 0 )
                } else if ( p.get() > w ) {
                    p.set( w );
                }

                p.setCss();

                window.getSelection ?
                    window.getSelection().removeAllRanges() :
                    document.selection.empty();
            } );

            $( document ).mouseup( function () {
                tag = false;
            } );

            // 鼠标点击
            $wrap.on( 'mousedown', p.bg, function ( e ) {

                if ( tag ) {
                    return true;
                }

                bgleft = $( p.bg ).offset().left;
                p.set( e.pageX - bgleft );

                if ( p.get() <= 0 ) {
                    p.set( 0 );
                } else if ( p.get() > w ) {
                    p.set( w );
                }

                p.setCss();
            } );
        }
    } );

    this.init();
}
