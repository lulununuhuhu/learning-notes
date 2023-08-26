/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     2022/6/3 14:11:52                            */
/*==============================================================*/


-- alter table "OrderInfo"
--    drop constraint FK_ORDERINF_GENERATE_ORDER_DE;

-- alter table "OrderInfo"
--    drop constraint FK_ORDERINF_ONETOMANY_ADMINIST;

-- alter table "OrderInfo"
--    drop constraint "FK_ORDERINF_ONETOMANY_PARENT&C";

-- alter table "order_details"
--    drop constraint FK_ORDER_DE_GENERATE2_ORDERINF;

-- alter table "order_details"
--    drop constraint FK_ORDER_DE_MANAGE_ADMINIST;

-- alter table "order_details"
--    drop constraint FK_ORDER_DE_ONETOMANY_TEACHER;

-- drop index "generate_FK";

-- drop index "oneTomany3_FK";

-- drop index "oneTomany2_FK";

-- drop table "OrderInfo" cascade constraints;

-- drop table "administrator" cascade constraints;

-- drop index "manage_FK";

-- drop index "generate2_FK";

-- drop index "oneTomany_1_FK";

-- drop table "order_details" cascade constraints;

-- drop table "parent&child" cascade constraints;

-- drop table "teacher" cascade constraints;

/*==============================================================*/
/* Table: "OrderInfo"                                           */
/*==============================================================*/
create table "OrderInfo" 
(
   "orderId"            INTEGER              not null,
   "par_parentId"       INTEGER,
   "adm_adminId"        INTEGER,
   "demand"             VARCHAR2(20),
   "concreteDemand"     CLOB,
   "createTime"         DATE                 not null,
   "locateAddress"      VARCHAR2(50),
   "childInfo"          VARCHAR2(50),
   "last_editTime"      DATE                 not null,
   constraint PK_ORDERINFO primary key ("orderId")
);

/*==============================================================*/
/* Index: "oneTomany2_FK"                                       */
/*==============================================================*/
create index "oneTomany2_FK" on "OrderInfo" (
   "adm_adminId" ASC
);

/*==============================================================*/
/* Index: "oneTomany3_FK"                                       */
/*==============================================================*/
create index "oneTomany3_FK" on "OrderInfo" (
   "par_parentId" ASC
);

/*==============================================================*/
/* Index: "generate_FK"                                         */
/*==============================================================*/
-- create index "generate_FK" on "OrderInfo" (
   
-- );

/*==============================================================*/
/* Table: "administrator"                                       */
/*==============================================================*/
create table "administrator" 
(
   "adminId"            INTEGER              not null,
   "adminAccount"       VARCHAR2(20)         not null,
   "adminPassword"      VARCHAR2(20)         not null,
   "adminRegisterTime"  DATE                 not null,
   "adminModifiedTime"  DATE                 not null,
   constraint PK_ADMINISTRATOR primary key ("adminId")
);

/*==============================================================*/
/* Table: "order_details"                                       */
/*==============================================================*/
create table "order_details" 
(
   "orderFlow_id"       INTEGER              not null,
   "orderId"            INTEGER,
   "adminId"            INTEGER,
   "teacherId"          INTEGER,
   "order_status"       INTEGER,
   "order_startTime"    DATE,
   "order_endTime"      DATE,
   "order_review"       CLOB,
   "order_editTime"     DATE,
   "order_score"        NUMBER(2,1)
   constraint PK_ORDER_DETAILS primary key ("orderFlow_id")
);

/*==============================================================*/
/* Index: "oneTomany_1_FK"                                      */
/*==============================================================*/
create index "oneTomany_1_FK" on "order_details" (
   "teacherId" ASC
);

/*==============================================================*/
/* Index: "generate2_FK"                                        */
/*==============================================================*/
create index "generate2_FK" on "order_details" (
   "orderId" ASC
);

/*==============================================================*/
/* Index: "manage_FK"                                           */
/*==============================================================*/
create index "manage_FK" on "order_details" (
   "adminId" ASC
);

/*==============================================================*/
/* Table: "parent&child"                                        */
/*==============================================================*/
create table "parent&child" 
(
   "parentId"           INTEGER              not null,
   "childName"          VARCHAR2(10)         not null,
   "childAge"           INTEGER              not null,
   "phoneNumber"        VARCHAR2(11)         not null,
   "locateAddress"      VARCHAR2(50)         not null,
   "parentAccountStatus" INTEGER,
   "parentOpenId"       VARCHAR2(50),
   "parentInfoModifyTime" DATE               not null,
   "parentRegisterTime" DATE                 not null,
   constraint "PK_PARENT&CHILD" primary key ("parentId")
);

/*==============================================================*/
/* Table: "teacher"                                             */
/*==============================================================*/
create table "teacher" 
(
   "teacherId"          INTEGER              not null,
   "gender"             INTEGER              not null,
   "name"               VARCHAR2(12)         not null,
   "age"                INTEGER              not null,
   "phoneNumber"        VARCHAR2(11),
   "school"             VARCHAR2(30)         not null,
   "photo"              CLOB,
   "introduction"       CLOB,
   "review_score"       NUMBER(2,1),
   "register_time"      DATE,
   "last_modified_time" DATE,
   "teacherAccountStatus" INTEGER,
   "openid"             VARCHAR2(50),
   constraint PK_TEACHER primary key ("teacherId")
);

alter table "OrderInfo"
   add constraint FK_ORDERINF_ONETOMANY_ADMINIST foreign key ("adm_adminId")
      references "administrator" ("adminId");

alter table "OrderInfo"
   add constraint "FK_ORDERINF_ONETOMANY_PARENT&C" foreign key ("par_parentId")
      references "parent&child" ("parentId");

alter table "order_details"
   add constraint FK_ORDER_DE_GENERATE2_ORDERINF foreign key ("orderId")
      references "OrderInfo" ("orderId");

alter table "order_details"
   add constraint FK_ORDER_DE_MANAGE_ADMINIST foreign key ("adminId")
      references "administrator" ("adminId");

alter table "order_details"
   add constraint FK_ORDER_DE_ONETOMANY_TEACHER foreign key ("teacherId")
      references "teacher" ("teacherId");

