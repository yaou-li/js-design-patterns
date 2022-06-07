/**
 * Composite pattern allows you to treat individual objects and compositions of objects uniformly
 */

type SongInfo = {
    Name: string;
    Singer: string;
    Year: number;
}


interface SongComponent {
    Add?(song: SongComponent): SongComponent;
    Remove?(song: SongComponent): SongComponent;
    DisplayInfo(): SongInfo[] | SongInfo;
}


class SongGroup implements SongComponent {
    description: string;
    songList: SongComponent[];
    constructor(desc: string) {
        this.description = desc;
        this.songList = [];
    }
    Add(song: SongComponent): SongComponent {
        this.songList.push(song);
        return this;
    }

    Remove(song: SongComponent): SongComponent {
        const idx = this.songList.indexOf(song);
        if (idx > -1) {
            this.songList.splice(idx, 1);
        }
        return this;
    }

    DisplayInfo(): SongInfo[] {
        const res = [];
        this.songList.forEach((song: SongComponent) => {
            const info = song.DisplayInfo();
            if (Array.isArray(info)) {
                res.concat(info)
            } else {
                res.push(info);
            }
        });
        return res;
    }
}

class Song implements SongComponent {
    name: string;
    singer: string;
    year: number;
    constructor(name: string, singer?: string, year?: number) {
        this.name = name;
        this.singer = singer;
        this.year = year;
    }

    DisplayInfo(): SongInfo {
        return {
            Name: this.name,
            Singer: this.singer,
            Year: this.year
        };
    }
}

function main() {
    const myFavorites = new SongGroup("my favorites");
    const jazz = new SongGroup("jazz");
    const blues = new SongGroup("blues");
    const pop = new SongGroup("pop");

    myFavorites.Add(jazz).Add(blues).Add(pop);
    jazz.Add(new Song("So What"));
    blues.Add(new Song("Stone Crazy"));
    pop.Add(new Song("Yong and Beautiful"));
}