/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import "./HomeTab.css";
import Ava from "/assets/images/ava.png";

const { Panel } = Collapse;

const HomeTab = ({ data }) => {
  const [dataDg, setDataDg] = useState<any>({});

  useEffect(() => {
    if (data) {
      setDataDg(data);
    }
  }, [data]);

  return (
    <div className="custom-collapse">
      <div className="border-t-[20px] border-[#F4F5F6]"></div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header={`Thông tin ${dataDg?.name || ""}`} key="1">
          {dataDg && (
            <div
              className="px-[15px] md:px-[0] pb-[15px] text-[16px]"
              dangerouslySetInnerHTML={{
                __html: dataDg?.description || "",
              }}
            />
          )}
        </Panel>
      </Collapse>

      <div className="border-t-[20px] border-[#F4F5F6]"></div>
      <Collapse defaultActiveKey={["2"]}>
        <Panel header="Sơ đồ cơ cấu tổ chức" key="2">
          {dataDg && dataDg?.diagrams?.length > 0 && (
            <div className="tree-wrapper">
              {dataDg?.diagrams?.map((diagram, index) => (
                <div key={index} className="tree">
                  <div className="tree-container">
                    <div className="text-center text-[20px] font-[700] mb-[44px]">
                      {diagram?.name}
                    </div>
                    {/* tree level 1 */}
                    {diagram?.data1?.length > 0 && (
                      <div className="flex justify-center mb-[65px] tree-item parent">
                        <div className="text-center">
                          <div className="border-[0.5px] border-[#8F9499] rounded-[9px] w-[100px] h-[100px] flex items-end mx-auto mb-[12px]">
                            <img
                              className="tree-img"
                              src={
                                diagram?.data1[0].image
                                  ? diagram?.data1[0].image
                                  : Ava
                              }
                            />
                          </div>
                          
                          <div className="text-center rounded-[12px] px-[16px] py-[12px] border border-[#006AF5] text-start">
                            <div>
                              <b>Họ và tên:</b> {diagram?.data1[0]?.name}
                            </div>
                            {diagram?.data1[0]?.departmentName && (
                              <div>
                                <b>Tên phòng ban: </b>{" "}
                                {diagram?.data1[0].departmentName}
                              </div>
                            )}
                            {diagram?.data1[0].phoneNumber && (
                              <div>
                                <b>Số điện thoại: </b>{" "}
                                {diagram?.data1[0].phoneNumber}
                              </div>
                            )}

                            {diagram?.data1[0]?.roleName && (
                              <div className="text-center text-[#0056D2]">
                                {diagram?.data1[0]?.roleName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* tree level 2 */}
                    {diagram?.data2?.length > 0 && (
                      <div className="relative flex items-center justify-center m-auto">
                        {diagram.data2.length === 1 && (
                          <div className="line-data2-1"></div>
                        )}
                        {diagram.data2.length === 2 && (
                          <div className="line-data2-2">
                            <div className="line-data2-left"></div>
                            <div className="line-data2-right"></div>
                          </div>
                        )}
                        {diagram.data2.length === 3 && (
                          <div className="line-data2-3">
                            <div className="line-data2-left line-data-after-left"></div>
                            <div className="line-data2-center line-data-after-center"></div>
                            {/* <div className="line-data-after-left"></div>
                            <div className="line-data-after-right"></div> */}
                            <div className="line-data2-right line-data-after-right"></div>
                          </div>
                        )}
                        {diagram.data2.length === 4 && (
                          <div className="line-data2-4">
                            <div className="line-data2-left line-data-after-left"></div>
                            <div className="line-data-after-children-left"></div>
                            <div className="line-data-after-children-right"></div>
                            <div className="line-data2-right line-data-after-right"></div>
                          </div>
                        )}
                        {diagram.data2.length > 4 && (
                          <>
                            <div className="line-data3-2-top-center"></div>
                            <div
                              className="line-data3-2"
                              style={{
                                width:
                                  diagram.data2.length === 5
                                    ? "81%"
                                    : diagram.data2.length > 5
                                    ? "100%"
                                    : "auto",
                              }}
                            ></div>
                          </>
                        )}
                        <div className="flex justify-center gap-[72px] mb-[65px]">
                          {diagram.data2?.map((employee, index) => (
                            <div
                              key={index}
                              className="relative tree-children-data2 w-[333px]"
                            >
                              <div className="line-data2-children-1"></div>
                              {diagram.data2.length > 4 && (
                                <div className="line-data2-children-3"></div>
                              )}
                              {diagram.data2.length > 1 &&
                                diagram.data3.length > 1 && (
                                  <div className="line-data2-children-2"></div>
                                )}
                              <div className="tree-item child text-center">
                                
                          <div className=" border-[0.5px] border-[#8F9499] rounded-[9px] w-[72px] h-[72px] flex items-end mx-auto mb-[12px]">
                            <img
                              className="tree-img"
                              src={employee.image ? employee.image : Ava}
                            />
                          </div>
                                
                                <div className="rounded-[12px] px-[16px] py-[8px] border border-[#006AF5] text-start">
                                  <div className="text-center">
                                    <b>Họ và tên: </b> {employee.name}
                                  </div>
                                  {employee?.departmentName && (
                                    <div>
                                      <b>Tên phòng ban: </b>{" "}
                                      {employee.departmentName}
                                    </div>
                                  )}
                                  {employee.phoneNumber && (
                                    <div>
                                      <b>Số điện thoại: </b>{" "}
                                      {employee.phoneNumber}
                                    </div>
                                  )}

                                  {employee?.roleName && (
                                    <div className="text-center text-[#0056D2]">
                                      {employee?.roleName}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* tree level 3 */}
                    {diagram?.data3?.length > 0 && (
                      <div className="relative flex items-center justify-center m-auto">
                        {/* <div className="line-data3"></div> */}
                        {diagram.data2.length == 1 &&
                          diagram.data3.length == 1 && (
                            <div className="line-data3-1"></div>
                          )}
                        {diagram.data2.length === 1 &&
                          diagram.data3.length === 2 && (
                            <div className="line-data3-3">
                              <div className="line-data2-left"></div>
                              <div className="line-data2-right"></div>
                            </div>
                          )}
                        {diagram.data2.length == 1 &&
                          diagram.data3.length > 2 && (
                            <div className="line-data3-4"></div>
                          )}
                        {(diagram.data3.length > 2 ||
                          (diagram.data2.length == 2 &&
                            diagram.data3.length == 2)) && (
                          <div
                            className="line-data3-2"
                            style={{
                              width:
                                diagram.data2.length === 2 &&
                                diagram.data3.length === 2
                                  ? "47%"
                                  : diagram.data2.length === 3 &&
                                    diagram.data3.length === 3
                                  ? "65%"
                                  : diagram.data2.length === 4 &&
                                    diagram.data3.length > 2
                                  ? "85%"
                                  : diagram.data3.length === 2
                                  ? "35%"
                                  : diagram.data3.length === 3
                                  ? "65%"
                                  : diagram.data3.length === 4
                                  ? "75%"
                                  : diagram.data3.length === 5
                                  ? "80%"
                                  : diagram.data3.length === 6
                                  ? "83%"
                                  : diagram.data3.length > 6
                                  ? "100%"
                                  : "auto",
                            }}
                          ></div>
                        )}
                        <div className="flex justify-center gap-[32px] ">
                          {diagram.data3.map((dataItem, index) => (
                            <div
                              key={index}
                              className="relative tree-children-data3 w-[300px]"
                            >
                              {(diagram.data3.length > 2 ||
                                (diagram.data2.length == 2 &&
                                  diagram.data3.length == 2)) && (
                                <div className="line-data3-children-2"></div>
                              )}
                              <div
                                key={index}
                                className="tree-item tree-item-data3 child text-center"
                              >
                                {dataItem.length > 0 &&
                                  dataItem.map((itemChildren, subIndex) => (
                                    <div key={subIndex} className="mb-[20px]">
                                      <div className="flex gap-[16px] rounded-[12px] px-[10px] py-[6px] border border-[#006AF5]">
                                      <div className=" border-[0.5px] border-[#8F9499] rounded-[9px] w-[64px] h-[64px] flex items-end mb-[12px]">
                                        <img
                                            className="tree-img"
                                            src={
                                              itemChildren.image
                                                ? itemChildren.image
                                                : Ava
                                            }
                                        />
                                      </div>
                                        
                                        <div className="w-[190px] text-start">
                                          <div className="text-[12px]">
                                            <b className="text-[12px]">
                                              Họ và tên:{" "}
                                            </b>{" "}
                                            {itemChildren.name}
                                          </div>

                                          {itemChildren.departmentName && (
                                            <div className="text-[12px]">
                                              <b className="text-[12px]">
                                                Tên phòng ban:{" "}
                                              </b>
                                              {itemChildren.departmentName}
                                            </div>
                                          )}

                                          {itemChildren.phoneNumber && (
                                            <div className="text-[12px]">
                                              <b className="text-[12px]">
                                                Số điện thoại:{" "}
                                              </b>{" "}
                                              {itemChildren.phoneNumber}
                                            </div>
                                          )}

                                          {itemChildren?.roleName && (
                                            <div className="text-[12px] text-center text-[#0056D2] break-words whitespace-normal">
                                              {itemChildren?.roleName}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </Collapse>
    </div>
  );
};

export default HomeTab;
