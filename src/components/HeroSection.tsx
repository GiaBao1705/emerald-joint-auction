import bannerImg from "@/assets/banner.jpg";

const HeroSection = () => {
  return (
    <section className="pt-20">
      <img
        src={bannerImg}
        alt="Công Ty Đấu Giá Hợp Danh Miền Tây"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default HeroSection;
