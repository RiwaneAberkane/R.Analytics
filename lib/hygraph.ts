// lib/hygraph.ts

export type DailyAnalytics = {
    date: string;
    visitors: number;
    pageViews: number;
    conversions: number;
    signups: number;
};

type HygraphResponse = {
    data?: {
        dailyAnalyticses: DailyAnalytics[];
    };
    errors?: { message: string }[];
};

export async function getDailyAnalytics(): Promise<DailyAnalytics[]> {
    const endpoint = process.env.HYGRAPH_ENDPOINT;
    const token = process.env.HYGRAPH_TOKEN;

    console.log("🔌 Hygraph endpoint:", endpoint);
    console.log("🔐 Token présent ?", token ? true : false);

    const query = `
    {
      dailyAnalyticses(orderBy: date_ASC) {
        date
        visitors
        pageViews
        conversions
        signups
      }
    }
  `;

    const res = await fetch(endpoint as string, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 },
    });

    const json = (await res.json()) as HygraphResponse;

    console.log("📦 Réponse Hygraph:", json);

    if (json.errors && json.errors.length > 0) {
        console.error("❌ Erreurs Hygraph:", json.errors);
        return [];
    }

    return json.data?.dailyAnalyticses ?? [];
}
