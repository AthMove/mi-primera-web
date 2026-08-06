"use client";

import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import PremiumStatCard from "@/components/ui/PremiumStatCard";
import { useLanguage } from "@/components/LanguageProvider";

interface Props {
  trustLabel: string;
  trustPercentage: number;
  sellerTrustScore: number;
  totalReviews: number;
  soldCount: number;
  followersCount: number;
  averageRating: string;
  seller: any;
}

export default function SellerDashboard({
  trustLabel,
  trustPercentage,
  sellerTrustScore,
  totalReviews,
  soldCount,
  followersCount,
  averageRating,
  seller,
}: Props) {
  const { t } = useLanguage();
  return (
    <div style={dashboardWrapperStyle}>
      <GlassCard padding="large" hover={false}>
        <section style={sellerDashboardStyle}>
          <div style={dashboardLeftStyle}>
           <p style={dashboardEyebrowStyle}>
  {t.sellerDashboardEyebrow}
</p>

<h2 style={dashboardTitleStyle}>
  {t.sellerDashboardTitle}
</h2>

            <div style={trustProgressWrapperStyle}>
              <div style={trustProgressHeaderStyle}>
                <span>{trustLabel}</span>

                <strong>
                  <AnimatedCounter
                    value={trustPercentage}
                    suffix="%"
                  />
                </strong>
              </div>

              <div style={trustProgressTrackStyle}>
                <div
                  style={{
                    ...trustProgressBarStyle,
                    width: `${trustPercentage}%`,
                  }}
                />
              </div>
            </div>

        <div style={dashboardChecklistStyle}>
  <span>
    ✓ {t.sellerDashboardVerifiedProfile}
  </span>

  <span>
    ✓ {t.sellerDashboardProtectedPayments}
  </span>

  <span>
    ✓ {t.sellerDashboardPublicHistory}
  </span>

  <span>
    ✓ {t.sellerDashboardVerifiedReviews}
  </span>
</div>
          </div>

          <div style={dashboardRightStyle}>
          <PremiumStatCard
  label={t.sellerDashboardTrustScore}
  value={
    totalReviews === 0 && soldCount === 0 ? (
      t.sellerDashboardNew
    ) : (
      <AnimatedCounter
        value={sellerTrustScore}
        decimals={1}
      />
    )
  }
  subtitle={t.sellerDashboardExcellentReputation}
/>

           <PremiumStatCard
  label={t.sellerDashboardSales}
  value={<AnimatedCounter value={soldCount} />}
  subtitle={t.sellerDashboardProductsSold}
/>

<PremiumStatCard
  label={t.sellerDashboardFollowers}
  value={<AnimatedCounter value={followersCount} />}
  subtitle={t.sellerDashboardCommunity}
/>

         <PremiumStatCard
  label={t.sellerDashboardRating}
  value={
    <>
      ★{" "}
      <AnimatedCounter
        value={Number(averageRating) || 0}
        decimals={1}
      />
    </>
  }
  subtitle={`${totalReviews} ${
    totalReviews === 1
      ? t.sellerDashboardReviewSingular
      : t.sellerDashboardReviewPlural
  }`}
/>

       <PremiumStatCard
  label={t.sellerDashboardMember}
  value={
    seller?.created_at
      ? new Date(seller.created_at).getFullYear()
      : "2025"
  }
  subtitle={t.sellerDashboardSince}
/>

           <PremiumStatCard
  label={t.sellerDashboardResponse}
  value={
    seller?.response_time ||
    t.sellerDashboardDefaultResponse
  }
  subtitle={t.sellerDashboardAverageTime}
/>
          </div>
        </section>
      </GlassCard>

      <style jsx>{`
        @media (max-width: 800px) {
          section {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }

        @media (max-width: 520px) {
          section {
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}

const dashboardWrapperStyle = {
  width: "100%",
  maxWidth: "1280px",
  margin: "40px auto",
};

const sellerDashboardStyle = {
  display: "grid",
  gridTemplateColumns: "1.2fr .9fr",
  gap: "40px",
};

const dashboardLeftStyle = {};

const dashboardRightStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "18px",
};

const dashboardEyebrowStyle = {
  margin: 0,
  fontSize: "11px",
  letterSpacing: "3px",
  color: "#888",
};

const dashboardTitleStyle = {
  fontSize: "40px",
  margin: "8px 0 24px",
  letterSpacing: "-2px",
};

const dashboardChecklistStyle = {
  display: "grid",
  gap: "14px",
  marginTop: "30px",
  fontWeight: 700,
  color: "#333",
};

const trustProgressWrapperStyle = {
  maxWidth: "560px",
  marginTop: "24px",
};

const trustProgressHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  fontSize: "11px",
  fontWeight: 900,
  letterSpacing: "1.5px",
};

const trustProgressTrackStyle = {
  width: "100%",
  height: "9px",
  overflow: "hidden",
  borderRadius: "999px",
  background: "#ecece8",
};

const trustProgressBarStyle = {
  height: "100%",
  borderRadius: "999px",
  background: "linear-gradient(90deg, #111, #555)",
  transition: "width 0.8s ease",
};