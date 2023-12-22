interface RouteMetaInfo {
  path: string;
  name: string;
  component: any;
  meta?: {
    title: string;
    icon?: string;
    auth?: string[];
    hidden?: boolean;
    orderNo?: number;
  };
  children?: Array<RouteMetaInfo>;
}
