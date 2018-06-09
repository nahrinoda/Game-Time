$(function()
{
    var tileSize, i, blank, blankTile, par = $('#cover'), bTileIndex, neighbourTiles = [], nLen, ind;

    function moveImage()
    {
        var blankTileIndex, clickedTileIndex, id = $(this).attr('id');

        blankTileIndex = $('.img').index(blankTile);
        clickedTileIndex = $('.img').index(this);

        if( (blankTileIndex == clickedTileIndex + 1) && (blankTileIndex %4 != 0 ) )
        {
            $('#'+id).before(blankTile);
        }
        else if( (blankTileIndex == clickedTileIndex - 1) && (clickedTileIndex %4 != 0 ) )
        {
            $('#'+id).after(blankTile);
        }
        else if( (blankTileIndex +4 == clickedTileIndex) || (blankTileIndex == clickedTileIndex+4) )
        {
            var prev1 = $('#'+id).prev(), prev2 = blankTile.prev();
            
            if( prev1.length == 0 )
                par.prepend(blankTile);    
            else
                $(prev1).after(blankTile);
            
            if( prev2.length == 0 )
                par.prepend($('#'+id));
            else
                $(prev2).after($('#'+id));
        }
    }

    function startApp()
    {
        par.html('');

        for(i=1; i<=16; i++)
        {
            par.append('<div class="img" id="img-'+i+'"><img src="https://www.webslake.com/w_img/cp_img/'+i+'.jpg"></div>');
            $('#img-'+i).on('click',moveImage);
        }

        blank = Math.floor((Math.random() * 16) + 1);
        $('#img-'+blank).html('').addClass('blank');
        
        blankTile = $('.blank');
        blankTile.off('click');

        tileSize = $('.img').outerWidth();
    }

    function shuffle()
    {
        for(i=0; i<153; i++)
        {
            neighbourTiles = [];
            bTileIndex = $('.img').index(blankTile);
        
            if( (bTileIndex + 1 < 16) && ((bTileIndex + 1) % 4 != 0 ) )
                neighbourTiles.push(bTileIndex + 1);

            if( (bTileIndex - 1 > -1) && (bTileIndex % 4 != 0 ) )
                neighbourTiles.push(bTileIndex - 1);
            
            if( bTileIndex + 4 < 16 )
                neighbourTiles.push(bTileIndex + 4);

            if( bTileIndex - 4 > -1 )
                neighbourTiles.push(bTileIndex - 4);

            nLen = neighbourTiles.length;

            ind = Math.floor((Math.random() * nLen));
    
            $('#cover .img:eq('+neighbourTiles[ind]+')').trigger('click');
        }
    }

    $('#shuffleBtn').on('click',shuffle);
    $('#restartBtn').on('click',startApp);

    startApp();
})