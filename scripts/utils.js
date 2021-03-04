'use strict'
const path = require('path')

exports.resolve = src => path.join(__dirname, '../', src)


exports.cssLoaders = function(options) {
    options = options || {}
    
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    
    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
        
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        
        if (options.extract) {
            return [MiniCssExtractPlugin.loader].concat(loaders)
        }
        
        return ['style-loader'].concat(loaders)
    }
    
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less', { lessOptions: { javascriptEnabled: true }}),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    const output = []
    const loaders = exports.cssLoaders(options)
    
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    
    return output
}