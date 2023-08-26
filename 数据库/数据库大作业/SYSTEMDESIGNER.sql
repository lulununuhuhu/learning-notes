/*
 Navicat Premium Data Transfer

 Source Server         : oracle19C
 Source Server Type    : Oracle
 Source Server Version : 190000
 Source Host           : localhost:1521
 Source Schema         : SYSTEMDESIGNER

 Target Server Type    : Oracle
 Target Server Version : 190000
 File Encoding         : 65001

 Date: 02/06/2022 16:39:58
*/


-- ----------------------------
-- Table structure for OrderInfo
-- ----------------------------
DROP TABLE "SYSTEMDESIGNER"."OrderInfo";
CREATE TABLE "SYSTEMDESIGNER"."OrderInfo" (
  "orderId" NUMBER VISIBLE NOT NULL ,
  "par_parentId" NUMBER VISIBLE ,
  "adm_adminId" NUMBER VISIBLE ,
  "demand" VARCHAR2(20 BYTE) VISIBLE ,
  "concreteDemand" CLOB VISIBLE ,
  "createTime" DATE VISIBLE ,
  "locateAddress" VARCHAR2(50 BYTE) VISIBLE ,
  "childInfo" VARCHAR2(50 BYTE) VISIBLE ,
  "review" CLOB VISIBLE ,
  "orderInfoModifyTime" DATE VISIBLE 
)
TABLESPACE "HOMETUTOR"
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for administrator
-- ----------------------------
DROP TABLE "SYSTEMDESIGNER"."administrator";
CREATE TABLE "SYSTEMDESIGNER"."administrator" (
  "adminId" NUMBER VISIBLE NOT NULL ,
  "adminAccount" VARCHAR2(20 BYTE) VISIBLE NOT NULL ,
  "adminPassword" VARCHAR2(20 BYTE) VISIBLE NOT NULL ,
  "adminRegisterTime" DATE VISIBLE NOT NULL ,
  "adminModifiedTime" DATE VISIBLE 
)
TABLESPACE "HOMETUTOR"
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE "SYSTEMDESIGNER"."order_details";
CREATE TABLE "SYSTEMDESIGNER"."order_details" (
  "orderFlow_id" NUMBER VISIBLE NOT NULL ,
  "orderId" NUMBER VISIBLE ,
  "adminId" NUMBER VISIBLE ,
  "teacherId" NUMBER VISIBLE ,
  "order_status" NUMBER VISIBLE ,
  "order_startTime" DATE VISIBLE ,
  "order_endTime" DATE VISIBLE ,
  "order_review" CLOB VISIBLE ,
  "order_modifiedTime" DATE VISIBLE 
)
TABLESPACE "HOMETUTOR"
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for parent&child
-- ----------------------------
DROP TABLE "SYSTEMDESIGNER"."parent&child";
CREATE TABLE "SYSTEMDESIGNER"."parent&child" (
  "parentId" NUMBER VISIBLE NOT NULL ,
  "childName" VARCHAR2(10 BYTE) VISIBLE NOT NULL ,
  "childAge" NUMBER VISIBLE NOT NULL ,
  "phoneNumber" VARCHAR2(11 BYTE) VISIBLE NOT NULL ,
  "locateAddress" VARCHAR2(50 BYTE) VISIBLE NOT NULL ,
  "parentAccountStatus" NUMBER VISIBLE ,
  "parentOpenId" VARCHAR2(50 BYTE) VISIBLE ,
  "parentInfoModifyTime" DATE VISIBLE ,
  "parentRegisterTime" DATE VISIBLE 
)
TABLESPACE "HOMETUTOR"
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE "SYSTEMDESIGNER"."teacher";
CREATE TABLE "SYSTEMDESIGNER"."teacher" (
  "teacherId" NUMBER VISIBLE NOT NULL ,
  "gender" NUMBER VISIBLE NOT NULL ,
  "name" VARCHAR2(12 BYTE) VISIBLE NOT NULL ,
  "age" NUMBER VISIBLE NOT NULL ,
  "phoneNumber" VARCHAR2(11 BYTE) VISIBLE ,
  "school" VARCHAR2(30 BYTE) VISIBLE NOT NULL ,
  "photo" VARCHAR2(200 BYTE) VISIBLE ,
  "introduction" CLOB VISIBLE ,
  "review_score" FLOAT(126) VISIBLE ,
  "register_time" DATE VISIBLE ,
  "last_modified_time" DATE VISIBLE ,
  "teacherAccountStatus" NUMBER VISIBLE ,
  "openid" VARCHAR2(50 BYTE) VISIBLE 
)
TABLESPACE "HOMETUTOR"
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Primary Key structure for table OrderInfo
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."OrderInfo" ADD CONSTRAINT "PK_ORDERINFO" PRIMARY KEY ("orderId");

-- ----------------------------
-- Checks structure for table OrderInfo
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."OrderInfo" ADD CONSTRAINT "SYS_C007611" CHECK ("orderId" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table OrderInfo
-- ----------------------------
CREATE INDEX "SYSTEMDESIGNER"."oneTomany2_FK"
  ON "SYSTEMDESIGNER"."OrderInfo" ("adm_adminId" ASC)
  LOGGING
  TABLESPACE "HOMETUTOR"
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  BUFFER_POOL DEFAULT
  FLASH_CACHE DEFAULT
)
   USABLE;
CREATE INDEX "SYSTEMDESIGNER"."oneTomany3_FK"
  ON "SYSTEMDESIGNER"."OrderInfo" ("par_parentId" ASC)
  LOGGING
  TABLESPACE "HOMETUTOR"
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  BUFFER_POOL DEFAULT
  FLASH_CACHE DEFAULT
)
   USABLE;

-- ----------------------------
-- Primary Key structure for table administrator
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."administrator" ADD CONSTRAINT "PK_ADMINISTRATOR" PRIMARY KEY ("adminId");

-- ----------------------------
-- Checks structure for table administrator
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."administrator" ADD CONSTRAINT "SYS_C007613" CHECK ("adminId" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."administrator" ADD CONSTRAINT "SYS_C007614" CHECK ("adminAccount" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."administrator" ADD CONSTRAINT "SYS_C007615" CHECK ("adminPassword" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."administrator" ADD CONSTRAINT "SYS_C007616" CHECK ("adminRegisterTime" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table order_details
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."order_details" ADD CONSTRAINT "PK_ORDER_DETAILS" PRIMARY KEY ("orderFlow_id");

-- ----------------------------
-- Checks structure for table order_details
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."order_details" ADD CONSTRAINT "SYS_C007618" CHECK ("orderFlow_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table order_details
-- ----------------------------
CREATE INDEX "SYSTEMDESIGNER"."generate2_FK"
  ON "SYSTEMDESIGNER"."order_details" ("orderId" ASC)
  LOGGING
  TABLESPACE "HOMETUTOR"
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  BUFFER_POOL DEFAULT
  FLASH_CACHE DEFAULT
)
   USABLE;
CREATE INDEX "SYSTEMDESIGNER"."manage_FK"
  ON "SYSTEMDESIGNER"."order_details" ("adminId" ASC)
  LOGGING
  TABLESPACE "HOMETUTOR"
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  BUFFER_POOL DEFAULT
  FLASH_CACHE DEFAULT
)
   USABLE;
CREATE INDEX "SYSTEMDESIGNER"."oneTomany_1_FK"
  ON "SYSTEMDESIGNER"."order_details" ("teacherId" ASC)
  LOGGING
  TABLESPACE "HOMETUTOR"
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  BUFFER_POOL DEFAULT
  FLASH_CACHE DEFAULT
)
   USABLE;

-- ----------------------------
-- Primary Key structure for table parent&child
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."parent&child" ADD CONSTRAINT "PK_PARENT&CHILD" PRIMARY KEY ("parentId");

-- ----------------------------
-- Checks structure for table parent&child
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."parent&child" ADD CONSTRAINT "SYS_C007620" CHECK ("parentId" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."parent&child" ADD CONSTRAINT "SYS_C007621" CHECK ("childName" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."parent&child" ADD CONSTRAINT "SYS_C007622" CHECK ("childAge" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."parent&child" ADD CONSTRAINT "SYS_C007623" CHECK ("phoneNumber" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."parent&child" ADD CONSTRAINT "SYS_C007624" CHECK ("locateAddress" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table teacher
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."teacher" ADD CONSTRAINT "PK_TEACHER" PRIMARY KEY ("teacherId");

-- ----------------------------
-- Checks structure for table teacher
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."teacher" ADD CONSTRAINT "SYS_C007626" CHECK ("teacherId" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."teacher" ADD CONSTRAINT "SYS_C007627" CHECK ("gender" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."teacher" ADD CONSTRAINT "SYS_C007628" CHECK ("name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."teacher" ADD CONSTRAINT "SYS_C007629" CHECK ("age" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."teacher" ADD CONSTRAINT "SYS_C007630" CHECK ("school" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table OrderInfo
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."OrderInfo" ADD CONSTRAINT "FK_ORDERINF_ONETOMANY_ADMINIST" FOREIGN KEY ("adm_adminId") REFERENCES "SYSTEMDESIGNER"."administrator" ("adminId") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."OrderInfo" ADD CONSTRAINT "FK_ORDERINF_ONETOMANY_PARENT&C" FOREIGN KEY ("par_parentId") REFERENCES "SYSTEMDESIGNER"."parent&child" ("parentId") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table order_details
-- ----------------------------
ALTER TABLE "SYSTEMDESIGNER"."order_details" ADD CONSTRAINT "FK_ORDER_DE_GENERATE2_ORDERINF" FOREIGN KEY ("orderId") REFERENCES "SYSTEMDESIGNER"."OrderInfo" ("orderId") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."order_details" ADD CONSTRAINT "FK_ORDER_DE_MANAGE_ADMINIST" FOREIGN KEY ("adminId") REFERENCES "SYSTEMDESIGNER"."administrator" ("adminId") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYSTEMDESIGNER"."order_details" ADD CONSTRAINT "FK_ORDER_DE_ONETOMANY_TEACHER" FOREIGN KEY ("teacherId") REFERENCES "SYSTEMDESIGNER"."teacher" ("teacherId") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
