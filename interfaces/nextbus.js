declare type Agency = {
  regionTitle: string,
  shortTitle?: string,
  tag: string,
  title: string,
};

declare type Stop = {
  lat: number,
  lon: number,
  shortTitle?: string,
  stopId?: string,
  tag: string,
  title: string,
};

declare type Direction = {
  name: string,
  stops: Stop[],
  tag: string,
  title: string,
  useForUI: boolean,
};

declare type Point = {
  lat: number,
  lon: number,
};

declare type Path = Point[];

declare type Route = {
  tag: string,
  title: string,
};

declare type RouteConfig = Route & {
  color: string,
  directions: Direction[],
  latMax: string,
  latMin: string,
  lonMax: string,
  lonMin: string,
  oppositeColor: string,
  paths: Path[],
  shortTitle?: string,
  stops: Stop[],
};
