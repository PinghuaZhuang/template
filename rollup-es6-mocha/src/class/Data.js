import z from '../core';
import rnothtmlwhite from '../var/rnothtmlwhite';

import slice from '../var/slice';

let _datas = [];

let fns = 'add remove has empty disable disabled lock locked fireWith fire fired'
    .match( rnothtmlwhite );

/**
 * 创建一个以数据驱动的对象, 当数据发生变化, 执行队列
 *
 * @param { String } name 数据名
 * @param { Object | String } options 配置信息
 * @example var height = Data( 'height', { type: 'number', default: 6 } );
 *
 * Possible options:
 *
 * type { Object }: 数据的类型
 *
 * detail { String }: 描述信息
 *
 * onlyChange { Boolean }: 当数据发生变化时才出发, 默认调用就触发
 *
 * default: 初始值
 *
 * callback options: 包括 callback 的配置
 *
 */
function Data () { }

z.extend( Data, {

    register ( name, options ) {
        let { type, default: def } = options;
        let callback = z.Callback( options );
        let zType;


        options = z.isPlainObject( options ) ? options : { };
        options.name = name;

        if ( -1 === z.inArray( name, _datas ) ) {
            _datas.push( name );
        }

        z.extend( Data, {

            /**
             * 可操控队列的对象
             * @param { * } value 设置的值
             * @param { Object } context 修改队列上下文, 默认该函数
             */
            [ name ] ( value, context ) {

                context = z.isObject( context ) ? context : Data[ name ];

                if ( !z.isUndefined( value ) ) {
                    if ( type ) {
                        if ( type === ( zType = z.type( value ) ) ) {
                            fireWith.call( context, value, callback, name );
                        } else {
                            throw new Error( `设置的值类型错误: ${zType}. 正确: ${type}` );
                        }
                    } else {
                        fireWith.call( context, value, callback, name );
                    }
                }
                return Data[ name ]._data;
            }
        } );

        z.extend( Data[ name ], {
            options,
            _data: type && type === z.type( def ) ? def : undefined
        } );

        z.each( fns, ( _, fn ) => {
            Data[ name ][ fn ] = ( ...rest ) => {
                wrap( callback, fn, ...rest );
            };
        } );
    },

    _datas () {
        return slice.call( _datas );
    },

    clear () {
        z.each( _datas, function ( index, ele ) {
            if ( Data[ ele ] && Data[ ele ].empty ) {
                Data[ ele ].empty();
                Data[ ele ] = null;
            }
        } );
        _datas = [];
    }
} );

// 暴露出去
if ( z.isWindow( this ) && z.isUndefined( this.Data ) ) {
    this.Data = Data;
}

function fireWith ( value, callback, name ) {
    Data[ name ]._data = value;
    callback.fireWith( this, [ value ] );
}

function wrap ( callback, name, ...rest ) {
    callback[ name ]( ...rest );
}

export default Data;
