import { useEffect, useState } from "react";
import "./ThongTinCaNhan.scss";
import { useParams } from "react-router-dom";
import { getExamDetail, postDoExam, getCityHamlet } from "../api/exam";
import { useNavigate } from "react-router-dom";
import { Button, Select, Form, Input, message } from 'antd';
import { SearchNormal1 } from "iconsax-react";
// 
import line1 from "/assets/images/line1.svg"
import line2 from "/assets/images/line2.svg"
import line3 from "/assets/images/line3.svg"
import line4 from "/assets/images/line4.svg"

const { Option } = Select;

type FieldType = {
    examId?: number;
    name: string;
    phone: string;
    cccd: string;
    cityId: number;
  };

const ThongTinCaNhan = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState<any>({});
  const [cityHamletLst, setCityHamletLst] = useState<any>([]);


  useEffect(() => {
    fetchExamDetail(id);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    fetchCityHamlet();
  }, []);

  const fetchExamDetail = async (id) => {
    try {
      const fetchedData = await getExamDetail(id);
      setDataDetail(fetchedData);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchCityHamlet = async () => {
    try {
      const fetchedData = await getCityHamlet();
      console.log('fetchedData', fetchedData);
      
      setCityHamletLst(fetchedData);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const onFinish = async (values: FieldType) => {
    
    try {
      const payload = {
        ...values,
        examId: dataDetail.id, 
      };

      const response: any = await postDoExam(payload);
      
      if (response) {
        message.success("Thông tin đã được gửi thành công!");
        navigate(`/thi-trac-nghiem/${id}`, { state: { userExamId: response?.userExamId } });
      } else {
        message.error("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error('Error calling API:', error);
      message.error("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại!");
    }
  };

  return (
    <>
        {/* Banner */}
        <div>
            <div className="banner-thongtincanhan relative">
                <div className="container mx-auto relative z-20">
                    <div className="lg:flex justify-between py-[40px]">
                        <div className="banner-left">
                            <div className="py-4">
                                <div className="text-[28px] uppercase">Cuộc thi trực tuyến</div>
                                <div className="mt-[15px] text-[52px] font-[800] uppercase text-[#0056D2]">
                                    {dataDetail?.name}
                                </div>
                                <div className="mt-[30px]">
                                    Cuộc thi trực tuyến tìm hiểu về lịch sử Đảng đợt II của năm 2024 <br/>
                                    Thể lệ số 227/TL-BTC ngày 29/8/2024 của Ban Tổ chức “Cuộc thi trực tuyến <br/>
                                     tìm hiểu về lịch sử Đảng” năm 2024
                                </div>
                            </div>
                        </div>
                        <div className="banner-right">
                            <div className="form-thongtincanhan">
                                <div className="text-[24px] font-bold mb-[20px]">Thông tin cá nhân</div>

                                <Form
                                    form={form}
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    layout="vertical"
                                >
                                    <Form.Item<FieldType>
                                        name="cityId" 
                                        label="Chọn đơn vị" 
                                        rules={[{ required: true, message: 'Vui lòng chọn đơn vị!' }]}
                                    >
                                        <Select
                                            placeholder="Chọn đơn vị"
                                            allowClear
                                            showSearch
                                            optionFilterProp="label"
                                            suffixIcon={<SearchNormal1 size="20"/>}
                                            // filterSort={(optionA, optionB) =>
                                            //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            // }
                                        >
                                          {cityHamletLst.map((city) => (
                                            <Option key={city.id} value={city.id}>
                                              {city.name}
                                            </Option>
                                          ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item<FieldType>
                                        label="Tên của bạn"
                                        name="name"
                                        rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                                    >
                                        <Input placeholder="Nhập tên"/>
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                          { required: true, message: 'Vui lòng nhập!' },
                                          {
                                            pattern: /^0\d{9,10}$/,
                                            message: 'Số điện thoại không hợp lệ!',
                                          },
                                        ]}
                                    >
                                        <Input placeholder="Nhập số điện thoại"/>
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Số CCCD/Định danh cá nhân"
                                        name="cccd"
                                        rules={[
                                          { required: true, message: 'Vui lòng nhập!' },
                                          {
                                            pattern: /^\d{12}$/,
                                            message: 'Số CCCD không hợp lệ!',
                                          },
                                        ]}
                                    >
                                        <Input placeholder="Nhập CCCD"/>
                                    </Form.Item>

                                    <Form.Item label={null}>
                                        <Button className="w-full mt-[24px] h-[48px] text-[16px] py-[12px] font-bold" type="primary" htmlType="submit">
                                            Tiếp theo
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

                <img src={line1} className="absolute left-0 bottom-0 hidden md:block"/>
                <img src={line2} className="absolute left-[65%] bottom-[25%] z-10 hidden md:block"/>
                <img src={line3} className="absolute left-[60%] bottom-0 hidden md:block"/>
                <img src={line4} className="absolute top-0 right-0 hidden md:block"/>
            </div>
        </div>
    </>
  );
};

export default ThongTinCaNhan;
