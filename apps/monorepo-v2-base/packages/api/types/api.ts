export type AssocitatedListBody = { id: number }[];
export type SupervisionRecordSearch = { type: number };
export type WarningListItem = Record<string, any>;

export type AssocitatedListItem = {
  id: number;
  version: number;
  createDate: string;
  updateDate: string;
  updateTime: string;
  csmc: string;
  jcdx: string;
  fgzcyj: string;
  lx: number;
  csbm: string;
};

export type AssocitatedListSearch = Record<string, unknown>;

export type QuitListBody = {
  sums: number;
  punishs: number;
  punishRate: number;
  noPunishs: number;
  noPunishRate: number;
  quitLists: Array<QuitListItem>;
};

export type QuitCate = {
  reason: string;
  statics: number;
  rate: number;
};

export type QuitListItem = {
  id: number; //主键
  name: string;
  statics: number;
  cates: QuitCate[];
};

export type QuitReasonPageItem = {
  id: number; //主键
  version: number; //版本号
  createDate: string;
  updateDate: string;
  bz: string; //备注
  zt: number; //状态
  objId: number; //奖惩对象ID
  mdid: number; //名单ID
  mdmc: string; //名单名称
  mdlx: number; //名单类型
  rdsj: string; //认定时间
  rdjg: string; //认定机关
  tcsj: string; //退出时间
  tcyy: string; //退出原因
  pc: string; //批次编号
  xyztmc: string; //信用主体名称
  tyshxydm: string; //统一社会信用代码
  rdyj: string; //认定依据
};

export type RedBlackStatAnalysisItem = {
  analysisName?: string;
  statics: number;
  firstType?: string;
  afterType?: string;
};

export type DeepBlackStatAnalysisItem = RedBlackStatAnalysisItem;
export type CrossStatAnalysisItem = RedBlackStatAnalysisItem;
export type DeepBlackStatAnalysisSearch = {
  darkType: 's' | 'm'; //s单领域多次列入 ,m多领域列入
  type: 'location' | 'type' | 'business';
};
export type CrossStatAnalysisSearch = Omit<DeepBlackStatAnalysisSearch, 'darkType'>;

export type CrossCompareListSearch = Record<string, unknown>;
export type CrossCompareListItem = {
  id: number; //主键
  version: number; //版本号
  createDate: string; //创建时间
  updateDate: string; //更新时间
  pc: string; //批次
  lx: string; //类型，1=激励 ，2=惩戒
  mdmc: string; //名单名称
  scsj: string; //上传时间
  scrmc: string; //上传人名称
  scbmmc: string; //上传部门名称
  sczs: string; //上传总数
  jcsl: number; //交叉数量
  zt: number; //状态
  scrId: number; //上传人id
  scbmId: number; //上传部门id
};

export type RedBlackListItem = {
  id: number; //主键
  version: number; //版本号
  createDate: string; //创建时间
  updateDate: string; //更新时间
  updateTime: string; //更新时间戳
  bz: string; //备注
  name: string; //名单名称
  mdbm: string; //名单编码
  ly: string; //领域
  mdlx: number; //奖惩类型，1=激励，2=惩戒，3重点关注
  lyId: number; //领域Id
  creatorId: number; //创建人id
  createOrgId: number; //创建部门id
};

export type CrossCompareResultSearch = {
  pc: string;
};
export type CrossCompareResultItem = {
  id: number; //主键
  version: number; //版本号
  createDate: string; //创建时间
  updateDate: string; //更新时间
  xyzt: string; //信用主体
  tyshxydm: string; //统一社会信用代码
  ly: string; //领域
  hy: string; //行业
  pc: string; //批次
};

export type RedBlackUpdateRecordItem = {
  id: number;
  version: number;
  createDate: string;
  updateDate: string;
  pc: string; //批次
  mdmc: string; //名单名称
  mdlx: string; //名单类型，1=红名单，2=黑名单，3=重点关注名单
  putCount: number; //列入数量
  removeCount: number; //列出数量
  orgName: string; //部门名称
  orgId: number; //部门id
};

export type RedBlackUpdateSearch = Record<string, any>;

export type RedBlackUpdateItem = {
  id: number; //主键
  version: number; //版本号
  createDate: string; //创建时间
  updateDate: string; //更新时间
  updateTime: string; //更新时间戳
  objListId: number; //名单id
  syncTime: string;
  pc: string; //批次
};

export type InstanceRedListSearch = Record<string, unknown>;

export type InstanceRedListItem = {
  id: number; //主键
  version: number; //版本号
  createDate: string; //创建时间
  updateDate: string; //更新时间
  updateTime: string; //更新时间戳
  bz: string; //描述
  name: string; //名称
  mdbm: string; //编码
  ly: string; //领域
  mdlx: number; //名单类型，1=红名单，2=黑名单，3=重点关注名单
  lyId: number; //领域id
  creatorId: number; //创建人id
  createOrgId: number; //创建部门id
  creatorName: string; //创建人名称
  createOrgName: string; //创建部门名称
};

export type MemoRandumStats = {
  totals: number; //总数
  rewardCount: number; //激励数量
  punishCount: number; //惩戒数量
};

export type RedBlackStatAnalysis = {
  rbType: 'r' | 'b';
  type: 'location' | 'type' | 'business';
};

export type PunishApplyStatPageItem = {
  id: number;
  version: number;
  createDate: string;
  updateDate: string;
  updateTime: string;
  csmc: string;
  dycs: number;
  zq: number;
  lx: number;
};

export type AwardAndPunishmentRecordPageItem = {
  id: number;
  version: number;
  createDate: string;
  updateDate: string;
  updateTime: string;
  rpMemoActionId: number;
  jcdxId: number;
  lx: number;
  ly: string;
  bm: string;
  nr: string;
  sxmc: string;
  jccsmc: string;
  zxsj: string;
  xyzt: string;
  dmlx: string;
  dm: string;
  zxjg: string;
};
export type AwardAndPunishmentRecordSearch = {
  dm: string;
  lx: number;
};

export type AwardAndPunishmentOverview = {
  id: number;
  total: number;
  quitCount: number;
  memoCount: number;
  actionCount: number;
  objMap: Record<string, number>;
  undoMap: Record<string, number>;
  doMap: Record<string, number>;
  serviceMap: Record<string, number>;
};

export type UsageAnalysisSearch = {
  field: string;
};

export type UsageAnalysisBody = {
  id: number;
  total: number;
  quitCount: number;
  memoCount: number;
  actionCount: number;
  feedbackCount: number;
  map: Record<string, number>;
};


export type EarlyWarningPageItem = {
  id: number;
  version: number;
  createDate: string;
  updateDate: string;
  modelCode: string;
  modelName: string;
  modelDescription: string;
  busiDomainCode: string;
  modelType: string;
  creator: string;
  updater: string;
};

export type EarlyWarningPageSearch = {
  busiDomainCode: string;
  modelName_like: string;
};

export type IndustryDomainItem = {
  busiDomainCode: string;
  busiDomainDesc: string;
  busiDomainName: string;
  createDate: string;
  creator: string;
  id: number;
  updateDate: string;
  updater: string;
  version: number;
};

export type RiskRegionAllocationListItem = {
  id: number;
  createDate: string;
  updateDate: string;
  areaCode: string;
  areaName: string;
  eventCount: number;
  cntDate: string;
};

export type EarlyWarningLevelPercentageItem = {
  id: number;
  version: number;
  updateDate: string;
  levelCode: string;
  levelName: string;
  eventCount: number;
  cntDate: string;
};

export type RiskIndustryAllocationItem = {
  id: number;
  version: number;
  createDate: string;
  updateDate: string;
  objIndustryCode: string;
  objIndustryName: string;
  eventCount: number;
  doneEventCount: number;
  undoEventCount: number;
  cntDate: string;
};

export type EarlyWarningNoticeBoard = {
  warningInformCnt: number; //累计预警预警通知数
  currentWeekInformCnt: number; //本周预警通知数
  compareSameWeekInformCnt: number; //同比周预警通知数
  compareSameWeekClimbMark: string; //同环比增长下降标识，1 增加 0 下降
  compareSameWeekPercent: string; //同比增长百分数
  ringRatioWeekInformCnt: number; //环比周预警通知数
  ringRatioWeekClimbMark: string; //同环比增长下降标识，1 增加 0 下降
  ringRatioWeekPercent: string; //环比增长百分数
};

export type EarlyWarningNoticeCount = {
  allCount: number;
  comparedAllCount: number;
  periodAllCount: number;
  periodComparedAllCount: number;
  compareSameWeekClimbMark: string;
  ringRatioWeekClimbMark: string;
};

export type WarningNoticeStatSearch = {
  period: string;
  cntDate_GreaterthanOrEqual?: string;
  cntDate_LessthanOrEqual?: string;
};
export type EarlyWarningNoticeStatItem = {
  dateFormatCode: string; //日期编号
  warningInformCnt: number; //累计预警预警通知数
};

export type RiskMaintainTrendStatItem = {
  dateFormatCode: string; //月份
  warningObjCnt: number; //预警主体数
};

export type RiskMaintainWarningStatItem = {
  idCode: string; //风险主体证件号
  objName: string; //通知人名称
  warningTimesCnt: number; //风险主体被预警通知次数
};
export type RiskMaintainCountBody = {
  riskObjAmountTrend: RiskMaintainTrendStatItem[];
  riskObjWarningRanking: RiskMaintainWarningStatItem[];
};
export type EarlyWarningStatPageSearch = {
  sendPerson: string;
  recordInfoName: string;
};
export type EarlyWarningStatPageItem = {
  busiDomainCode: string;
  busiDomainName: string;
  createDate: string;
  id: number;
  informObjCode: string;
  informObjInstitution: string;
  objIndustryCode: string;
  objIndustryName: string;
  objName: string;
  sendIfsuccessStatus: string;
  sendTimes: number;
  updateDate: string;
  version: number;
  warningObjCnt: number;
};

export type EarlyWarnMaintainDetail = {
  id: number;
  version: number;
  createDate: string;
  updateDate: string;
  idCode: string;
  idCodeType: string;
  objName: string;
  objAreaCode: string;
  objAreaName: string;
  objBusiDomain: string;
  objIdentityType: number;
  objIndustryCode: string;
  objIndustryName: string;
  creator: string;
  updater: string;
  assessmentRate: number;
  assessmentRatePercent: string;
  warnedCount: number;
  warnedCountRate: number;
  warnedCountRatePercent: string;
};

export type PeriodStatisticsSearch = {
  period: 'day' | 'week' | 'month' | 'year';
  id: number | string;
};


export interface searchParamsType {
  pageSize: number;
  pageNumber: number;
  [params: string]: any;
}
export interface dataType {
  id: number | string;
  levelName: string;
  levelDesc: string;
  [params: string]: any;
}

export interface createType {
  levelName: string;
  basicColor: string;
  levelDesc?: string;
  [params: string]: any;
}
