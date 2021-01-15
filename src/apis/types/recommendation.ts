// 0: pc, 1: andriod, 2: iphone, 3: ipad
enum BannerType {
  type0 = 0,
  type1 = 1,
  type2 = 2,
  type3 = 3
}

export interface IBannerRequest {
  type: BannerType
}
