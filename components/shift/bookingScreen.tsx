import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Calendar, LocaleConfig, DateData } from "react-native-calendars";
import dayjs from "dayjs";
import "dayjs/locale/es";

const todayISO = dayjs().format("YYYY-MM-DD");

function buildWeekendDisabled(year: number, month1to12: number) {
  const start = dayjs(
    `${year}-${String(month1to12).padStart(2, "0")}-01`
  ).startOf("month");
  const end = start.endOf("month");
  const marks: Record<string, any> = {};
  let d = start;
  while (d.isBefore(end) || d.isSame(end, "day")) {
    const wd = d.day();
    if (wd === 0 || wd === 6) {
      const key = d.format("YYYY-MM-DD");
      marks[key] = { disabled: true, disableTouchEvent: true };
    }
    d = d.add(1, "day");
  }
  return marks;
}

LocaleConfig.locales.es = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";
dayjs.locale("es");

type SlotPeriodKey = "Tarde" | "DIA";
export type BookingValue = {
  dateISO: string;
  time24: string;
  display: string;
  iso: string;
};

type ApiSlot = {
  time: string;
  available: boolean;
  period: SlotPeriodKey;
};

type ApiResponse = {
  date: string;
  slots: ApiSlot[];
};

async function fetchSlots(dateISO: string): Promise<ApiResponse> {
  const base: ApiSlot[] = [
    { time: "09:00", available: true, period: "DIA" },
    { time: "10:00", available: true, period: "DIA" },
    { time: "11:00", available: true, period: "DIA" },
    { time: "12:00", available: true, period: "DIA" },
    { time: "14:00", available: true, period: "Tarde" },
    { time: "15:00", available: true, period: "Tarde" },
    { time: "16:00", available: true, period: "Tarde" },
    { time: "17:00", available: true, period: "Tarde" },
  ];

  return { date: dateISO, slots: base };
}

export default function BookingScreen({
  onChange,
}: {
  onChange?: (v: BookingValue) => void;
}) {
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [apiSlots, setApiSlots] = useState<ApiSlot[]>([]);
  const [weekendMarks, setWeekendMarks] = useState<Record<string, any>>(
    buildWeekendDisabled(dayjs(date).year(), dayjs(date).month() + 1)
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setSelectedSlot(null);
      const res = await fetchSlots(date);
      if (mounted) setApiSlots(res.slots);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [date]);

  useEffect(() => {
    if (onChange && date && selectedSlot) {
      onChange({
        dateISO: date,
        time24: selectedSlot,
        display: formatForSaving(date, selectedSlot),
        iso: toIso(date, selectedSlot),
      });
    }
  }, [date, selectedSlot, onChange]);

  const onMonthChange = (m: {
    year: number;
    month: number;
    timestamp?: number;
  }) => {
    setWeekendMarks(buildWeekendDisabled(m.year, m.month));
  };

  const grouped: Record<SlotPeriodKey, ApiSlot[]> = useMemo(() => {
    const groupedInit: Record<SlotPeriodKey, ApiSlot[]> = {
      DIA: [],
      Tarde: [],
    };
    apiSlots.forEach((s) => groupedInit[s.period].push(s));
    return groupedInit;
  }, [apiSlots]);

  const marked = useMemo(
    () => ({
      ...weekendMarks,
      [date]: { selected: true, selectedColor: "rgb(59, 110, 62)" },
    }),
    [weekendMarks, date]
  );

  const onSelectDay = (d: DateData) => {
    const wd = dayjs(d.dateString).day();
    if (wd === 0 || wd === 6) return;
    setDate(d.dateString);
  };

  const renderSlot = (item: ApiSlot) => {
    const isSelected = selectedSlot === item.time;

    const disabled = !item.available || loading || isPastSlot(date, item.time);

    return (
      <Pressable
        onPress={() => !disabled && setSelectedSlot(item.time)}
        style={[
          styles.slot,
          isSelected && styles.slotSelected,
          disabled && styles.slotDisabled,
        ]}
      >
        <Text
          style={[
            styles.slotText,
            isSelected && styles.slotTextSelected,
            disabled && styles.slotTextDisabled,
          ]}
        >
          {toHumanTime(item.time)}
        </Text>
      </Pressable>
    );
  };

  function isPastSlot(dateISO: string, time24: string) {
    const [h, m] = time24.split(":").map(Number);
    const slotDT = dayjs(dateISO).hour(h).minute(m).second(0).millisecond(0);
    return slotDT.isBefore(dayjs());
  }

  function formatForSaving(dateISO: string, time24: string) {
    const [h, m] = time24.split(":").map(Number);
    return dayjs(dateISO).hour(h).minute(m).format("DD/MM/YYYY HH:mm");
  }
  function toIso(dateISO: string, time24: string) {
    const [h, m] = time24.split(":").map(Number);
    return dayjs(dateISO)
      .hour(h)
      .minute(m)
      .second(0)
      .millisecond(0)
      .toISOString();
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", width: "100%" }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Seleccioná fecha y hora</Text>

        <Calendar
          onDayPress={onSelectDay}
          onMonthChange={onMonthChange}
          markedDates={marked}
          firstDay={1}
          minDate={todayISO}
          disabledDaysIndexes={[0, 6]}
          disableAllTouchEventsForDisabledDays
          theme={{
            textDayFontFamily: "System",
            textMonthFontFamily: "System",
            textDayHeaderFontFamily: "System",
            selectedDayBackgroundColor: "rgb(59, 110, 62)",
            todayTextColor: "rgb(59, 110, 62)",
            arrowColor: "#111827",
          }}
          monthFormat="MMMM"
        />

        <View style={styles.section}>
          <Period
            label="Dia"
            loading={loading}
            data={grouped.DIA}
            renderItem={renderSlot}
          />
          <Period
            label="Tarde"
            loading={loading}
            data={grouped.Tarde}
            renderItem={renderSlot}
          />
        </View>

        {selectedSlot && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Turno elegido:
              {formatForSaving(date, selectedSlot)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function Period({
  label,
  loading,
  data,
  renderItem,
}: {
  label: string;
  loading: boolean;
  data: ApiSlot[];
  renderItem: (item: ApiSlot) => React.ReactElement;
}) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.periodTitle}>{label}</Text>

      {loading ? (
        <Text style={{ opacity: 0.6 }}>Cargando horarios…</Text>
      ) : data.length === 0 ? (
        <Text style={{ opacity: 0.6 }}>Sin disponibilidad</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(i) => i.time}
          renderItem={({ item }) => renderItem(item)}
          horizontal={false}
          numColumns={3}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ gap: 10 }}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}

function toHumanTime(time24: string) {
  const [h, m] = time24.split(":").map(Number);
  const pm = h >= 12;
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${`${m}`.padStart(2, "0")} ${pm ? "p.m." : "a.m."}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8, color: "#111827" },
  section: { marginTop: 12 },
  periodTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  slot: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#11271833",
    borderRadius: 12,
    marginBottom: 10,
    marginRight: 10,
    minWidth: 96,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  slotSelected: {
    borderColor: "rgb(59, 110, 62)",
    backgroundColor: "#2563eb10",
  },
  slotDisabled: {
    borderColor: "#9CA3AF66",
    backgroundColor: "#F3F4F6",
  },
  slotText: { color: "#111827", fontSize: 15, fontWeight: "500" },
  slotTextSelected: { color: "#1f2937" },
  slotTextDisabled: { color: "#9CA3AF" },
  footer: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  footerText: { color: "#111827" },
});
