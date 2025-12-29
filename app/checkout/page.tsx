"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useCart } from "@/context/CartContext";

interface Province {
  province_id: string;
  province_name: string;
}

interface District {
  district_id: string;
  district_name: string;
}

interface Ward {
  ward_id: string;
  ward_name: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Address API state
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Load provinces on mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Fetch provinces
  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://vapi.vnappmob.com/api/province/"
      );
      const data = await response.json();
      if (data.results) {
        setProvinces(data.results);
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
      setSelectedDistrict("");
      setSelectedWard("");
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  const fetchDistricts = async (provinceId: string) => {
    setLoadingDistricts(true);
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province/district/${provinceId}`
      );
      const data = await response.json();
      if (data.results) {
        setDistricts(data.results);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoadingDistricts(false);
    }
  };

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
      setSelectedWard("");
      setWards([]);
    }
  }, [selectedDistrict]);

  const fetchWards = async (districtId: string) => {
    setLoadingWards(true);
    try {
      const response = await fetch(
        `https://vapi.vnappmob.com/api/province/ward/${districtId}`
      );
      const data = await response.json();
      if (data.results) {
        setWards(data.results);
      }
    } catch (error) {
      console.error("Error fetching wards:", error);
    } finally {
      setLoadingWards(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!selectedProvince) {
      newErrors.province = "Vui lòng chọn tỉnh/thành phố";
    }

    if (!selectedDistrict) {
      newErrors.district = "Vui lòng chọn quận/huyện";
    }

    if (!selectedWard) {
      newErrors.ward = "Vui lòng chọn phường/xã";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ cụ thể";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      return;
    }

    // Get full address names
    const provinceName =
      provinces.find((p) => p.province_id === selectedProvince)
        ?.province_name || "";
    const districtName =
      districts.find((d) => d.district_id === selectedDistrict)
        ?.district_name || "";
    const wardName =
      wards.find((w) => w.ward_id === selectedWard)?.ward_name || "";

    const fullAddress = `${formData.address}, ${wardName}, ${districtName}, ${provinceName}`;

    const orderData = {
      ...formData,
      fullAddress,
      province: provinceName,
      district: districtName,
      ward: wardName,
      paymentMethod,
      items,
      totalPrice,
      orderDate: new Date().toISOString(),
    };

    // Here you would typically send orderData to your backend API
    console.log("Order data:", orderData);

    // Clear cart and redirect
    clearCart();
    router.push("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <Icon
          icon="mdi:cart-outline"
          className="mx-auto mb-4 h-24 w-24 text-light-gray"
        />
        <h2 className="mb-2 text-2xl font-semibold text-dark">
          Giỏ hàng trống
        </h2>
        <p className="mb-6 text-black">
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </p>
        <Button onClick={() => router.push("/products")}>
          Tiếp tục mua sắm
        </Button>
      </div>
    );
  }

  const shippingFee = 30000;
  const finalTotal = totalPrice + shippingFee;

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-black">
          <span>Trang chủ</span>
          <Icon icon="mdi:chevron-right" className="h-4 w-4" />
          <span>Giỏ hàng</span>
          <Icon icon="mdi:chevron-right" className="h-4 w-4" />
          <span className="text-dark">Thanh toán</span>
        </div>

        <h1 className="mb-8 text-2xl font-semibold uppercase tracking-wide text-dark">
          Thanh toán
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            {/* Customer Information */}
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-dark">
                Thông tin khách hàng
              </h2>
              <div className="space-y-4">
                <Input
                  label="Họ và tên"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                  required
                  placeholder="Nhập họ và tên"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    required
                    placeholder="email@example.com"
                  />

                  <Input
                    label="Số điện thoại"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    required
                    placeholder="0123456789"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-dark">
                Địa chỉ giao hàng
              </h2>
              <div className="space-y-4">
                <Select
                  label="Tỉnh/Thành phố"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  error={errors.province}
                  required
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province_name}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Quận/Huyện"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  error={errors.district}
                  required
                  disabled={!selectedProvince || loadingDistricts}
                >
                  <option value="">
                    {loadingDistricts
                      ? "Đang tải..."
                      : "Chọn quận/huyện"}
                  </option>
                  {districts.map((district) => (
                    <option
                      key={district.district_id}
                      value={district.district_id}
                    >
                      {district.district_name}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Phường/Xã"
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  error={errors.ward}
                  required
                  disabled={!selectedDistrict || loadingWards}
                >
                  <option value="">
                    {loadingWards ? "Đang tải..." : "Chọn phường/xã"}
                  </option>
                  {wards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>
                      {ward.ward_name}
                    </option>
                  ))}
                </Select>

                <Input
                  label="Địa chỉ cụ thể"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  required
                  placeholder="Số nhà, tên đường"
                />

                <div>
                  <label className="mb-2 block text-sm text-gray">
                    Ghi chú đơn hàng (tùy chọn)
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-light-gray bg-white px-4 py-3 text-sm text-dark placeholder:text-gray/60 transition-colors focus-visible:border-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dark"
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-dark">
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 border border-light-gray p-4 transition-colors hover:border-dark">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 accent-primary"
                  />
                  <div>
                    <p className="font-medium text-dark">
                      Thanh toán khi nhận hàng (COD)
                    </p>
                    <p className="text-sm text-black">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 border border-light-gray p-4 transition-colors hover:border-dark">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 accent-primary"
                  />
                  <div>
                    <p className="font-medium text-dark">
                      Chuyển khoản ngân hàng
                    </p>
                    <p className="text-sm text-black">
                      Chuyển khoản trực tiếp vào tài khoản ngân hàng
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 border border-light-gray p-6">
              <h2 className="mb-4 text-lg font-semibold text-dark">
                Đơn hàng của bạn
              </h2>

              <div className="mb-4 space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 bg-light-gray">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      )}
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-dark text-xs text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-dark">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-xs text-black">Size: {item.size}</p>
                      )}
                      <p className="mt-1 text-sm font-semibold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-light-gray pt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-black">Tạm tính:</span>
                  <span className="font-medium text-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="mb-4 flex justify-between text-sm">
                  <span className="text-black">Phí vận chuyển:</span>
                  <span className="font-medium text-dark">
                    {formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="mb-6 flex justify-between border-t border-light-gray pt-4">
                  <span className="text-lg font-semibold text-dark">
                    Tổng cộng:
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleSubmitOrder}
                >
                  Đặt hàng
                </Button>

                <button
                  onClick={() => router.push("/cart")}
                  className="mt-3 flex w-full items-center justify-center gap-2 py-3 text-sm text-black hover:text-dark"
                >
                  <Icon icon="mdi:chevron-left" className="h-4 w-4" />
                  Quay lại giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}