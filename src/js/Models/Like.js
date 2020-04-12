
export default class Like
{
    static addLike()
    {
        window.likes.push(
            {
                id : window.selected.id,
                title : window.selected.title,
                image : window.selected.image,
                author : window.selected.author,
            }
        );
        window.selected.liked = true;
        this.writeLikes()
    }
    static removeLike(index)
    {
        window.likes.splice(index, 1);
        window.selected.liked = false;
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

    static writeLikes()
    {
        
    }

    static loadLikes()
    {
        
    }
}