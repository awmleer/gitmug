export abstract class Content {
  type:'file'|'dir'|'symlink'|'submodule';
  _links:{
    git:string;
    self:string;
    html:string;
  };
  size:number;
  name:string;
  path:string;
  sha:string;
  url:string;
  git_url:string;
  html_url:string;
  download_url:string;
}

export class File extends Content {
  encoding:string; //e.g. "base64"
  content:string; // "encoded content ..."
}

export class Directory extends Content {
  size=0;
  download_url=null;
}

export class Symlink extends Content {
  target: string; //"/path/to/symlink/target"
}


export class Submodule extends Content {
  submodule_git_url:string;
  size=0;
  download_url=null;
}
