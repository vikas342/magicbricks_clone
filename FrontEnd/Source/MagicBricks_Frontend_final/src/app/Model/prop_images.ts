export interface imagedata {
  data: image_object;
}

export interface image_object {
  images: imgurls[];
}

export interface imgurls {
  imageurl: string;
}
