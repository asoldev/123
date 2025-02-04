import { Button, Modal } from "antd";
import React from "react";

export const ModalConFirm = ({
  isModalVisible,
  handleCancel,
  handleConfirm,
  title,
  textConfirm,
  textCancel,
  textContent,
}) => {
  return (
    <div>
      {" "}
      <Modal
        open={isModalVisible}
        title={
          <h1 className="font-bold text-2xl leading-[29.05px] text-center">
            {title}
          </h1>
        }
        onCancel={handleCancel}
        footer={[
          <div className="gap-3 flex items-center w-full justify-center mt-14">
            <Button
              key="cancel"
              variant="outlined"
              className="h-[49px] w-[220px] border rounded-xl font-semibold text-[17px] leading-[20.57px] text-[#0056D2] border-[#0056D2]"
              onClick={handleCancel}
            >
              {textCancel}
            </Button>
            <Button
              key="confirm"
              type="primary"
              className="h-[49px] w-[220px] border rounded-xl font-semibold text-[17px] leading-[20.57px]"
              onClick={handleConfirm}
            >
              {textConfirm}
            </Button>
          </div>,
        ]}
      >
        <div className="mt-[52px]">
          <p className="text-xl leading-6 text-[#181818]">{textContent}</p>
        </div>
      </Modal>
    </div>
  );
};
