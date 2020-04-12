
export default class Like
{
    static addLike()
    {
        window.likes.push(
            {
                id : window.selected.id,
                title : window.selected.title,
                imag : window.selected.image_url,
                author : window.selected.publisher
            }
        );
        this.writeLikes()
    }
    static removeLike(index)
    {
        window.likes.splice(index, 1);
        this.writeLikes();
    }

    static toggleLike()
    {
        var index = window.likes.findIndex(like => 
            {
                return like.id == window.selected.id;
            }
        );
        if (index > -1)
        {
            this.removeLike(index);
        }
        else
        {
            this.addLike();
        }
    }
    static exist(item)
    {
        return (window.likes.find(like => like.id == window.selected.id) != undefined)
    }

    static writeLikes()
    {
        
    }

    static loadLikes()
    {
        
    }
}