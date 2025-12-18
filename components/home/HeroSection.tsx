import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "../ui/button";

const HeroSection = () => {
    return (
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-pink-100">
            <CommonWrapper>

                <div className="mx-auto text-center py-8 mt-10">
                    <h2 className="text-4xl sm:text-5xl md:text-[80px] font-extrabold text-gray-900 mb-10 leading-tight">
                        Turbo speed.<br />Enterprise scale.
                    </h2>
                    <p className="text-base sm:text-[24px] text-gray-600 mb-10 max-w-2xl mx-auto">
                        Signify is the central hub for your digital signs.
                        Update menus, promotions, and videos instantly, from anywhere.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                        <Button className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition shadow-lg">
                            Get started now
                        </Button>
                        <Button className="px-8 py-4 bg-white text-gray-900 font-medium hover:bg-gray-50 transition border border-gray-200 shadow-sm">
                            Book a Demo
                        </Button>
                    </div>

                    <div className="mb-20">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">407,984</div>
                        <div className="text-xs font-bold gradient-text tracking-widest uppercase">
                            Total screens playing around the world under Signify
                        </div>
                    </div>
                </div>
            </CommonWrapper>
        </section>
    );
};

export default HeroSection;