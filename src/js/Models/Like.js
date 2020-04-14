
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
    }
    static removeLike(index)
    {
        window.likes.splice(index, 1);
        window.selected.liked = false;
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

    static saveLikes()
    {
        window.localStorage.setItem('likes', JSON.stringify(window.likes));
    }

    static loadLikes()
    {
        let likes = JSON.parse(window.localStorage.getItem('likes'));
        if (likes)
        {
            window.likes = likes;
        }
    }
}