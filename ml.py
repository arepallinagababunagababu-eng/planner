# ==============================================================
# 🌊 Flood Prediction System — Ultimate Accuracy Version
# Models: KNN | K-Means | Hierarchical | ANN | RNN
# ==============================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
from scipy.cluster.hierarchy import dendrogram, linkage
from tensorflow import keras
from tensorflow.keras import layers, callbacks
import warnings
warnings.filterwarnings("ignore")

# ==============================================================
# 1️⃣ Load Dataset
# ==============================================================
df = pd.read_csv("flood prediction.csv")
print("✅ Dataset Loaded Successfully!\n", df.shape)
print(df.head())

# ==============================================================
# 2️⃣ Identify Target Column
# ==============================================================
target_candidates = [c for c in df.columns if 'flood' in c.lower() or 'status' in c.lower()]
target_col = target_candidates[0] if target_candidates else df.columns[-1]
print(f"\n🎯 Target column detected: {target_col}")

# ==============================================================
# 3️⃣ Data Preprocessing
# ==============================================================
X = df.drop(columns=[target_col])
y = df[target_col]

# Encode non-numeric features
for col in X.select_dtypes(include=['object']).columns:
    X[col] = LabelEncoder().fit_transform(X[col].astype(str))
if y.dtype == 'object':
    y = LabelEncoder().fit_transform(y.astype(str))

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split for supervised learning
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# ==============================================================
# 4️⃣ K-Nearest Neighbors (KNN) — Hyperparameter Search
# ==============================================================
print("\n🧩 Training K-Nearest Neighbors (KNN)...")
param_grid = {'n_neighbors': [3, 5, 7, 9, 11], 'weights': ['uniform', 'distance']}
grid_knn = GridSearchCV(KNeighborsClassifier(), param_grid, cv=5)
grid_knn.fit(X_train, y_train)
best_knn = grid_knn.best_estimator_

y_pred_knn = best_knn.predict(X_test)
knn_acc = accuracy_score(y_test, y_pred_knn)
print(f"✅ KNN Accuracy: {knn_acc:.4f} | Params: {grid_knn.best_params_}")

# ==============================================================
# 5️⃣ K-Means Clustering
# ==============================================================
print("\n🎯 Running K-Means Clustering...")
kmeans = KMeans(n_clusters=len(np.unique(y)), random_state=42, n_init=10)
clusters = kmeans.fit_predict(X_scaled)

plt.figure(figsize=(6,5))
plt.scatter(X_scaled[:,0], X_scaled[:,1], c=clusters, cmap='viridis', s=40)
plt.title("K-Means Clustering")
plt.show()

# ==============================================================
# 6️⃣ Hierarchical Clustering
# ==============================================================
print("\n🪜 Running Hierarchical Clustering...")
linkage_matrix = linkage(X_scaled, method='ward')
plt.figure(figsize=(9,4))
dendrogram(linkage_matrix)
plt.title("Hierarchical Clustering Dendrogram")
plt.show()

# ==============================================================
# 7️⃣ Artificial Neural Network (ANN)
# ==============================================================
print("\n🧠 Training ANN (with EarlyStopping)...")

ann = keras.Sequential([
    layers.Dense(256, activation='relu', input_shape=(X_train.shape[1],)),
    layers.Dropout(0.4),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(len(np.unique(y)), activation='softmax')
])
ann.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
early_stop = callbacks.EarlyStopping(monitor='val_accuracy', patience=5, restore_best_weights=True)
history_ann = ann.fit(X_train, y_train, epochs=60, batch_size=16, 
                      validation_split=0.2, verbose=0, callbacks=[early_stop])
ann_acc = ann.evaluate(X_test, y_test, verbose=0)[1]
print(f"✅ ANN Accuracy: {ann_acc:.4f}")

# Plot accuracy curve
plt.plot(history_ann.history['accuracy'], label='Train Acc')
plt.plot(history_ann.history['val_accuracy'], label='Val Acc')
plt.title("ANN Accuracy Curve")
plt.legend()
plt.show()

# ==============================================================
# 8️⃣ Recurrent Neural Network (RNN)
# ==============================================================
print("\n🔁 Training RNN (SimpleRNN + EarlyStopping)...")

X_train_rnn = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
X_test_rnn = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))

rnn = keras.Sequential([
    layers.SimpleRNN(128, activation='tanh', input_shape=(X_train.shape[1], 1)),
    layers.Dropout(0.4),
    layers.Dense(64, activation='relu'),
    layers.Dense(len(np.unique(y)), activation='softmax')
])
rnn.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
early_stop_rnn = callbacks.EarlyStopping(monitor='val_accuracy', patience=5, restore_best_weights=True)
history_rnn = rnn.fit(X_train_rnn, y_train, epochs=60, batch_size=16, 
                      validation_split=0.2, verbose=0, callbacks=[early_stop_rnn])
rnn_acc = rnn.evaluate(X_test_rnn, y_test, verbose=0)[1]
print(f"✅ RNN Accuracy: {rnn_acc:.4f}")

plt.plot(history_rnn.history['accuracy'], label='Train Acc')
plt.plot(history_rnn.history['val_accuracy'], label='Val Acc')
plt.title("RNN Accuracy Curve")
plt.legend()
plt.show()

# ==============================================================
# 9️⃣ Model Accuracy Summary
# ==============================================================
results = {'KNN': knn_acc, 'ANN': ann_acc, 'RNN': rnn_acc}
best_model = max(results, key=results.get)
print("\n📊 Model Accuracies")
for m, acc in results.items():
    print(f"{m}: {acc:.4f}")
print(f"\n🏆 Best Performing Model: {best_model} | Accuracy: {results[best_model]:.4f}")

# Save best model
if best_model == 'ANN':
    ann.save("best_flood_model.h5")
elif best_model == 'RNN':
    rnn.save("best_flood_model.h5")
print("\n💾 Saved best model as 'best_flood_model.h5'")